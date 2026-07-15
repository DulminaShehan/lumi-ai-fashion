import { useState } from 'react';
import type { FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api/categories';
import { ApiRequestError } from '@/lib/apiClient';
import { Button, Card, EmptyState, Field, Input, PageHeader } from '@/components/ui';
import { CenteredSpinner } from '@/components/ui/Spinner';
import type { Category } from '@/types';
import styles from './CategoriesPage.module.css';

export function CategoriesPage() {
  const queryClient = useQueryClient();
  const categoriesQuery = useQuery({ queryKey: ['categories'], queryFn: () => categoriesApi.list() });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['categories'] });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; imageUrl?: string }) => categoriesApi.create(data),
    onSuccess: () => {
      invalidate();
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; name: string; imageUrl?: string }) =>
      categoriesApi.update(data.id, { name: data.name, imageUrl: data.imageUrl }),
    onSuccess: () => {
      invalidate();
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => categoriesApi.remove(id),
    onSuccess: () => invalidate(),
    onError: (err) => alert(err instanceof ApiRequestError ? err.message : 'Failed to delete category'),
  });

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setImageUrl('');
    setFormError(null);
    setShowForm(false);
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setName(category.name);
    setImageUrl(category.imageUrl ?? '');
    setShowForm(true);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, name, imageUrl: imageUrl || undefined });
      } else {
        await createMutation.mutateAsync({ name, imageUrl: imageUrl || undefined });
      }
    } catch (err) {
      setFormError(err instanceof ApiRequestError ? err.message : 'Failed to save category');
    }
  };

  const saving = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Organize products into shoppable categories"
        action={
          !showForm && (
            <Button onClick={() => setShowForm(true)}>Add Category</Button>
          )
        }
      />

      {showForm && (
        <Card className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <Field label="Name">
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </Field>
              <Field label="Image URL" hint="Optional">
                <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" />
              </Field>
            </div>
            {formError && <p style={{ color: 'var(--color-error)', fontSize: 13, marginTop: 12 }}>{formError}</p>}
            <div className={styles.actions}>
              <Button type="submit" disabled={saving}>
                {editingId ? 'Save Changes' : 'Create Category'}
              </Button>
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {categoriesQuery.isLoading ? (
        <CenteredSpinner />
      ) : categoriesQuery.data?.data.length === 0 ? (
        <EmptyState title="No categories yet" message="Create your first category to start organizing products." />
      ) : (
        <div className={styles.grid}>
          {categoriesQuery.data?.data.map((category) => (
            <Card key={category.id} className={styles.tile}>
              {category.imageUrl && <img src={category.imageUrl} alt="" className={styles.image} />}
              <div className={styles.body}>
                <span className={styles.name}>{category.name}</span>
                <span className={styles.meta}>/{category.slug}</span>
                <div className={styles.actions}>
                  <Button variant="secondary" size="sm" onClick={() => startEdit(category)}>
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm(`Delete "${category.name}"?`)) deleteMutation.mutate(category.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
