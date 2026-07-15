import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { Badge, Button, EmptyState, PageHeader } from '@/components/ui';
import { CenteredSpinner } from '@/components/ui/Spinner';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const productQuery = useQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.getById(id!),
  });

  const deleteMutation = useMutation({
    mutationFn: () => productsApi.remove(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/products');
    },
    onError: () => alert('Failed to delete product'),
  });

  if (productQuery.isLoading) return <CenteredSpinner />;

  const product = productQuery.data?.data;
  if (!product) {
    return <EmptyState title="Product not found" action={<Link to="/products">Back to Products</Link>} />;
  }

  return (
    <div>
      <PageHeader
        title={product.name}
        subtitle={`/${product.slug}`}
        action={
          <div className={styles.headerActions}>
            <Link to={`/products/${product.id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => {
                if (confirm(`Delete "${product.name}"? This cannot be undone.`)) deleteMutation.mutate();
              }}
            >
              Delete
            </Button>
          </div>
        }
      />

      <div className={styles.layout}>
        <div className={styles.gallery}>
          {product.images.length > 0 ? (
            <>
              <img src={product.images[0]} alt={product.name} className={styles.galleryMain} />
              {product.images.slice(1).map((src) => (
                <img key={src} src={src} alt="" className={styles.galleryThumb} />
              ))}
            </>
          ) : (
            <div className={styles.galleryMain} />
          )}
        </div>

        <div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>{product.category.name}</div>
            <div className={styles.priceRow}>
              {product.discountPrice ? (
                <>
                  <span className={styles.priceStrike}>${product.price}</span>
                  <span className={styles.priceDiscount}>${product.discountPrice}</span>
                </>
              ) : (
                <span>${product.price}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {product.isFeatured && <Badge tone="gold">Featured</Badge>}
              {product.isNewArrival && <Badge tone="blue">New Arrival</Badge>}
              {product.isBestSeller && <Badge tone="green">Best Seller</Badge>}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Description</div>
            <p className={styles.description}>{product.description}</p>
          </div>

          <div className={styles.section}>
            <div className={styles.metaGrid}>
              <div>
                <div className={styles.metaLabel}>Stock</div>
                <div className={styles.metaValue}>{product.stock} units</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Gender</div>
                <div className={styles.metaValue}>{product.gender}</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Budget Tier</div>
                <div className={styles.metaValue}>{product.budgetTier.replace('_', ' ')}</div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Sizes</div>
            <div className={styles.tagGroup}>
              {product.sizes.map((size) => (
                <span key={size} className={styles.tag}>
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Colors</div>
            <div className={styles.tagGroup}>
              {product.colors.map((color) => (
                <span key={color} className={styles.tag}>
                  {color}
                </span>
              ))}
            </div>
          </div>

          {product.suitableBodyTypes.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Suitable Body Types</div>
              <div className={styles.tagGroup}>
                {product.suitableBodyTypes.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.suitableSkinTones.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Suitable Skin Tones</div>
              <div className={styles.tagGroup}>
                {product.suitableSkinTones.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.styleTags.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Style Tags</div>
              <div className={styles.tagGroup}>
                {product.styleTags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.occasionTags.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Occasion Tags</div>
              <div className={styles.tagGroup}>
                {product.occasionTags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
