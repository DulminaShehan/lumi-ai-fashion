import { useState } from 'react';
import type { FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminsApi } from '@/lib/api/admins';
import { ApiRequestError } from '@/lib/apiClient';
import { Button, Card, EmptyState, Field, Input } from '@/components/ui';
import { CenteredSpinner } from '@/components/ui/Spinner';
import tableStyles from '@/components/ui/Table.module.css';
import styles from './AdminsSection.module.css';

export function AdminsSection() {
  const queryClient = useQueryClient();
  const adminsQuery = useQuery({ queryKey: ['admins'], queryFn: () => adminsApi.list() });

  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admins'] });

  const createMutation = useMutation({
    mutationFn: (data: { fullName: string; email: string; password: string }) => adminsApi.create(data),
    onSuccess: () => {
      invalidate();
      resetForm();
    },
  });

  const revokeMutation = useMutation({
    mutationFn: (id: string) => adminsApi.revoke(id),
    onSuccess: () => invalidate(),
    onError: (err) => alert(err instanceof ApiRequestError ? err.message : 'Failed to remove admin'),
  });

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setFormError(null);
    setShowForm(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    try {
      await createMutation.mutateAsync({ fullName, email, password });
    } catch (err) {
      setFormError(err instanceof ApiRequestError ? err.message : 'Failed to create admin');
    }
  };

  const admins = adminsQuery.data?.data ?? [];

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h2 style={{ fontSize: 17 }}>Admins</h2>
          <p className={styles.sectionSubtitle}>Accounts with access to this dashboard</p>
        </div>
        {!showForm && <Button onClick={() => setShowForm(true)}>Add Admin</Button>}
      </div>

      {showForm && (
        <Card className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <Field label="Full Name">
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </Field>
              <Field label="Email">
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Field>
              <Field label="Password">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </Field>
            </div>
            {formError && <p style={{ color: 'var(--color-error)', fontSize: 13, marginTop: 12 }}>{formError}</p>}
            <div className={styles.actions}>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Creating…' : 'Create Admin'}
              </Button>
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {adminsQuery.isLoading ? (
        <CenteredSpinner />
      ) : admins.length === 0 ? (
        <EmptyState title="No admins yet" message="Add an admin account to manage this dashboard." />
      ) : (
        <div className={tableStyles.tableWrap}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className={styles.nameCell}>{admin.fullName}</td>
                  <td className={tableStyles.muted}>{admin.email}</td>
                  <td className={tableStyles.muted}>{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Remove admin access for "${admin.fullName}"?`)) revokeMutation.mutate(admin.id);
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
