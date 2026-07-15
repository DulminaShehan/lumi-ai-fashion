import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api/orders';
import { ORDER_STATUSES, ORDER_STATUS_TONE } from '@/lib/orderStatus';
import type { OrderStatus } from '@/types';
import { Badge, Card, EmptyState, PageHeader, Select } from '@/components/ui';
import { CenteredSpinner } from '@/components/ui/Spinner';
import styles from './OrderDetailPage.module.css';

export function OrderDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const orderQuery = useQuery({
    queryKey: ['orders', id],
    queryFn: () => ordersApi.getById(id!),
  });

  const statusMutation = useMutation({
    mutationFn: (status: OrderStatus) => ordersApi.updateStatus(id!, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: () => alert('Failed to update order status'),
  });

  if (orderQuery.isLoading) return <CenteredSpinner />;

  const order = orderQuery.data?.data;
  if (!order) {
    return <EmptyState title="Order not found" action={<Link to="/orders">Back to Orders</Link>} />;
  }

  return (
    <div>
      <PageHeader
        title={order.orderNumber}
        subtitle={`Placed on ${new Date(order.createdAt).toLocaleString()}`}
        action={<Badge tone={ORDER_STATUS_TONE[order.status]}>{order.status}</Badge>}
      />

      <div className={styles.layout}>
        <Card>
          <div className={styles.sectionTitle}>Items</div>
          {order.items.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <img src={item.productImage} alt={item.productName} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{item.productName}</div>
                <div className={styles.itemMeta}>
                  {item.color} · {item.size} · Qty {item.quantity}
                </div>
              </div>
              <div className={styles.itemPrice}>${(Number(item.unitPrice) * item.quantity).toFixed(2)}</div>
            </div>
          ))}

          <div style={{ marginTop: 20 }}>
            <div className={styles.totalsRow}>
              <span>Subtotal</span>
              <span>${order.subtotal}</span>
            </div>
            <div className={styles.totalsRow}>
              <span>Shipping</span>
              <span>${order.shippingFee}</span>
            </div>
            <div className={styles.totalsRowFinal}>
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        </Card>

        <div>
          <Card className={styles.sidebarSection}>
            <div className={styles.sectionTitle}>Update Status</div>
            <Select
              value={order.status}
              disabled={statusMutation.isPending}
              onChange={(e) => statusMutation.mutate(e.target.value as OrderStatus)}
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Card>

          <Card className={styles.sidebarSection}>
            <div className={styles.sectionTitle}>Customer</div>
            <div className={styles.infoLine}>
              {order.user.fullName}
              <br />
              {order.user.email}
              {order.user.phone && (
                <>
                  <br />
                  {order.user.phone}
                </>
              )}
            </div>
          </Card>

          <Card className={styles.sidebarSection}>
            <div className={styles.sectionTitle}>Shipping Address</div>
            <div className={styles.infoLine}>
              {order.shippingName}
              <br />
              {order.shippingAddressLine}
              <br />
              {order.shippingCity}, {order.shippingPostalCode}
              <br />
              {order.shippingCountry}
              <br />
              {order.shippingPhone}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
