import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api/orders';
import { ORDER_STATUSES, ORDER_STATUS_TONE } from '@/lib/orderStatus';
import type { OrderStatus } from '@/types';
import { Badge, EmptyState, PageHeader, Select } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { CenteredSpinner } from '@/components/ui/Spinner';
import tableStyles from '@/components/ui/Table.module.css';
import styles from './OrdersListPage.module.css';

const PAGE_SIZE = 15;

export function OrdersListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = (searchParams.get('status') as OrderStatus | null) ?? '';
  const [page, setPage] = useState(1);

  const ordersQuery = useQuery({
    queryKey: ['orders', { page, status }],
    queryFn: () => ordersApi.list({ page, limit: PAGE_SIZE, status: status || undefined }),
  });

  const orders = ordersQuery.data?.data ?? [];
  const meta = ordersQuery.data?.meta;

  return (
    <div>
      <PageHeader title="Orders" subtitle="Track and fulfill customer orders" />

      <div className={styles.toolbar}>
        <Select
          value={status}
          onChange={(e) => {
            setSearchParams(e.target.value ? { status: e.target.value } : {});
            setPage(1);
          }}
        >
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>

      {ordersQuery.isLoading ? (
        <CenteredSpinner />
      ) : orders.length === 0 ? (
        <EmptyState title="No orders found" message="Orders placed by customers will show up here." />
      ) : (
        <>
          <div className={tableStyles.tableWrap}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Placed</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className={tableStyles.clickable} onClick={() => navigate(`/orders/${order.id}`)}>
                    <td className={styles.orderNumber}>{order.orderNumber}</td>
                    <td>
                      <div className={styles.customer}>
                        <span>{order.user.fullName}</span>
                        <span className={tableStyles.muted}>{order.user.email}</span>
                      </div>
                    </td>
                    <td>{order.items.length}</td>
                    <td>${order.total}</td>
                    <td>
                      <Badge tone={ORDER_STATUS_TONE[order.status]}>{order.status}</Badge>
                    </td>
                    <td className={tableStyles.muted}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {meta && meta.totalPages > 1 && (
            <div className={styles.pagination}>
              <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <span>
                Page {meta.page} of {meta.totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
