import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { productsApi } from '@/lib/api/products';
import { categoriesApi } from '@/lib/api/categories';
import { ordersApi } from '@/lib/api/orders';
import { Card, PageHeader } from '@/components/ui';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const productsQuery = useQuery({
    queryKey: ['products', 'count'],
    queryFn: () => productsApi.list({ limit: 1 }),
  });
  const categoriesQuery = useQuery({ queryKey: ['categories'], queryFn: () => categoriesApi.list() });
  const ordersQuery = useQuery({
    queryKey: ['orders', 'count'],
    queryFn: () => ordersApi.list({ limit: 1 }),
  });
  const pendingOrdersQuery = useQuery({
    queryKey: ['orders', 'count', 'PENDING'],
    queryFn: () => ordersApi.list({ limit: 1, status: 'PENDING' }),
  });

  const stats = [
    { label: 'Products', value: productsQuery.data?.meta.total, to: '/products' },
    { label: 'Categories', value: categoriesQuery.data?.data.length, to: '/categories' },
    { label: 'Orders', value: ordersQuery.data?.meta.total, to: '/orders' },
    { label: 'Pending Orders', value: pendingOrdersQuery.data?.meta.total, to: '/orders?status=PENDING' },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your catalog and orders" />
      <div className={styles.grid}>
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.to} style={{ textDecoration: 'none' }}>
            <Card>
              <div className={styles.statValue}>{stat.value ?? '—'}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
