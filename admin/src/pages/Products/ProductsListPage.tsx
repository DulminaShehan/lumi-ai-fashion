import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { categoriesApi } from '@/lib/api/categories';
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { Badge, Button, EmptyState, Input, PageHeader, Select } from '@/components/ui';
import { CenteredSpinner } from '@/components/ui/Spinner';
import tableStyles from '@/components/ui/Table.module.css';
import styles from './ProductsListPage.module.css';

const PAGE_SIZE = 15;

export function ProductsListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);

  const categoriesQuery = useQuery({ queryKey: ['categories'], queryFn: () => categoriesApi.list() });
  const productsQuery = useQuery({
    queryKey: ['products', { page, search: debouncedSearch, categoryId }],
    queryFn: () =>
      productsApi.list({ page, limit: PAGE_SIZE, search: debouncedSearch || undefined, categoryId: categoryId || undefined }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    onError: () => alert('Failed to delete product'),
  });

  const products = productsQuery.data?.data ?? [];
  const meta = productsQuery.data?.meta;

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Manage your catalog"
        action={<Button onClick={() => navigate('/products/new')}>Add Product</Button>}
      />

      <div className={styles.toolbar}>
        <Input
          placeholder="Search products…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categoriesQuery.data?.data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      {productsQuery.isLoading ? (
        <CenteredSpinner />
      ) : products.length === 0 ? (
        <EmptyState title="No products found" message="Try adjusting your filters, or add a new product." />
      ) : (
        <>
          <div className={tableStyles.tableWrap}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Flags</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={tableStyles.clickable}
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <td>
                      <div className={styles.nameCell}>
                        <span className={styles.nameLabel}>{product.name}</span>
                        <span className={tableStyles.muted}>{product.sizes.length} sizes · {product.colors.length} colors</span>
                      </div>
                    </td>
                    <td>{product.category.name}</td>
                    <td>
                      {product.discountPrice ? (
                        <>
                          <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', marginRight: 6 }}>
                            ${product.price}
                          </span>
                          <span>${product.discountPrice}</span>
                        </>
                      ) : (
                        `$${product.price}`
                      )}
                    </td>
                    <td>{product.stock}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {product.isFeatured && <Badge tone="gold">Featured</Badge>}
                        {product.isNewArrival && <Badge tone="blue">New</Badge>}
                        {product.isBestSeller && <Badge tone="green">Best Seller</Badge>}
                      </div>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Link to={`/products/${product.id}/edit`}>
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm(`Delete "${product.name}"?`)) deleteMutation.mutate(product.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
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
