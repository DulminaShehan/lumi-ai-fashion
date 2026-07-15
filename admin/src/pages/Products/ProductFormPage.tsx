import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/lib/api/products';
import { categoriesApi } from '@/lib/api/categories';
import { ApiRequestError } from '@/lib/apiClient';
import {
  BODY_TYPE_OPTIONS,
  BUDGET_TIER_OPTIONS,
  FASHION_STYLE_OPTIONS,
  GENDER_OPTIONS,
  OCCASION_OPTIONS,
  SKIN_TONE_OPTIONS,
} from '@/lib/productOptions';
import type { BodyType, FashionStyle, Occasion, ProductInput, SkinTone } from '@/types';
import { Button, Card, ChipToggleGroup, Field, Input, PageHeader, Select, TagInput, Textarea } from '@/components/ui';
import { CenteredSpinner } from '@/components/ui/Spinner';
import styles from './ProductFormPage.module.css';

const EMPTY_FORM: ProductInput = {
  name: '',
  description: '',
  price: 0,
  discountPrice: undefined,
  images: [],
  sizes: [],
  colors: [],
  stock: 0,
  gender: 'UNISEX',
  categoryId: '',
  suitableBodyTypes: [],
  suitableSkinTones: [],
  styleTags: [],
  occasionTags: [],
  budgetTier: 'MID_RANGE',
  isFeatured: false,
  isNewArrival: false,
  isBestSeller: false,
};

export function ProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({ queryKey: ['categories'], queryFn: () => categoriesApi.list() });
  const productQuery = useQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.getById(id!),
    enabled: isEdit,
  });

  const [form, setForm] = useState<ProductInput>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productQuery.data) {
      const p = productQuery.data.data;
      setForm({
        name: p.name,
        description: p.description,
        price: Number(p.price),
        discountPrice: p.discountPrice ? Number(p.discountPrice) : undefined,
        images: p.images,
        sizes: p.sizes,
        colors: p.colors,
        stock: p.stock,
        gender: p.gender,
        categoryId: p.categoryId,
        suitableBodyTypes: p.suitableBodyTypes,
        suitableSkinTones: p.suitableSkinTones,
        styleTags: p.styleTags,
        occasionTags: p.occasionTags,
        budgetTier: p.budgetTier,
        isFeatured: p.isFeatured,
        isNewArrival: p.isNewArrival,
        isBestSeller: p.isBestSeller,
      });
    }
  }, [productQuery.data]);

  const saveMutation = useMutation({
    mutationFn: (data: ProductInput) =>
      isEdit ? productsApi.update(id!, data) : productsApi.create(data),
    onSuccess: ({ data: product }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate(`/products/${product.id}`);
    },
    onError: (err) => {
      setError(err instanceof ApiRequestError ? err.message : 'Failed to save product');
    },
  });

  const update = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.categoryId) {
      setError('Please select a category');
      return;
    }
    if (form.images.length === 0) {
      setError('Add at least one image URL');
      return;
    }
    if (form.sizes.length === 0 || form.colors.length === 0) {
      setError('Add at least one size and one color');
      return;
    }

    saveMutation.mutate(form);
  };

  if (isEdit && productQuery.isLoading) return <CenteredSpinner />;

  return (
    <div>
      <PageHeader title={isEdit ? 'Edit Product' : 'Add Product'} />

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}

        <Card>
          <div className={styles.sectionTitle}>Basic Information</div>
          <div className={styles.fieldStack}>
            <Field label="Name">
              <Input value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </Field>
            <Field label="Description">
              <Textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                required
              />
            </Field>
            <div className={styles.row}>
              <Field label="Category">
                <Select value={form.categoryId} onChange={(e) => update('categoryId', e.target.value)} required>
                  <option value="">Select category…</option>
                  {categoriesQuery.data?.data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Gender">
                <Select value={form.gender} onChange={(e) => update('gender', e.target.value as ProductInput['gender'])}>
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.sectionTitle}>Pricing & Inventory</div>
          <div className={styles.row}>
            <Field label="Price ($)">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => update('price', Number(e.target.value))}
                required
              />
            </Field>
            <Field label="Discount Price ($)" hint="Optional">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.discountPrice ?? ''}
                onChange={(e) => update('discountPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </Field>
            <Field label="Stock">
              <Input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => update('stock', Number(e.target.value))}
                required
              />
            </Field>
          </div>
        </Card>

        <Card>
          <div className={styles.sectionTitle}>Media & Variants</div>
          <div className={styles.fieldStack}>
            <Field label="Image URLs" hint="Press Enter to add each URL">
              <TagInput value={form.images} onChange={(v) => update('images', v)} placeholder="https://…" />
            </Field>
            <div className={styles.row}>
              <Field label="Sizes" hint="Press Enter to add">
                <TagInput value={form.sizes} onChange={(v) => update('sizes', v)} placeholder="S, M, L…" />
              </Field>
              <Field label="Colors" hint="Press Enter to add">
                <TagInput value={form.colors} onChange={(v) => update('colors', v)} placeholder="Black, Ivory…" />
              </Field>
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.sectionTitle}>Recommendation Tags</div>
          <div className={styles.fieldStack}>
            <Field label="Budget Tier">
              <Select
                value={form.budgetTier}
                onChange={(e) => update('budgetTier', e.target.value as ProductInput['budgetTier'])}
              >
                {BUDGET_TIER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option.replace('_', ' ')}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Suitable Body Types">
              <ChipToggleGroup<BodyType>
                options={BODY_TYPE_OPTIONS}
                value={form.suitableBodyTypes}
                onChange={(v) => update('suitableBodyTypes', v)}
              />
            </Field>
            <Field label="Suitable Skin Tones">
              <ChipToggleGroup<SkinTone>
                options={SKIN_TONE_OPTIONS}
                value={form.suitableSkinTones}
                onChange={(v) => update('suitableSkinTones', v)}
              />
            </Field>
            <Field label="Style Tags">
              <ChipToggleGroup<FashionStyle>
                options={FASHION_STYLE_OPTIONS}
                value={form.styleTags}
                onChange={(v) => update('styleTags', v)}
              />
            </Field>
            <Field label="Occasion Tags">
              <ChipToggleGroup<Occasion>
                options={OCCASION_OPTIONS}
                value={form.occasionTags}
                onChange={(v) => update('occasionTags', v)}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <div className={styles.sectionTitle}>Merchandising Flags</div>
          <div className={styles.checkboxRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => update('isFeatured', e.target.checked)}
              />
              Featured
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.isNewArrival}
                onChange={(e) => update('isNewArrival', e.target.checked)}
              />
              New Arrival
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.isBestSeller}
                onChange={(e) => update('isBestSeller', e.target.checked)}
              />
              Best Seller
            </label>
          </div>
        </Card>

        <div className={styles.actions}>
          <Button type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
