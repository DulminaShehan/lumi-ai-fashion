import { ApiError } from '../../utils/ApiError';
import { slugify } from '../../utils/slugify';
import { categoryRepository } from '../categories/category.repository';
import { ProductListFilters, productRepository } from './product.repository';
import { createProductSchema, updateProductSchema } from './product.schema';
import { z } from 'zod';

type CreateProductInput = z.infer<typeof createProductSchema>;
type UpdateProductInput = z.infer<typeof updateProductSchema>;

async function uniqueSlugFor(name: string, excludeId?: string): Promise<string> {
  const base = slugify(name);
  let candidate = base;
  let suffix = 1;

  while (true) {
    const existing = await productRepository.findBySlug(candidate);
    if (!existing || existing.id === excludeId) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
}

export const productService = {
  list(filters: ProductListFilters) {
    return productRepository.findAll(filters);
  },

  async getById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) throw ApiError.notFound('Product not found');
    return product;
  },

  async create(data: CreateProductInput) {
    const category = await categoryRepository.findById(data.categoryId);
    if (!category) throw ApiError.badRequest('Category does not exist');

    const slug = await uniqueSlugFor(data.name);
    const { categoryId, ...rest } = data;

    return productRepository.create({
      ...rest,
      slug,
      category: { connect: { id: categoryId } },
    });
  },

  async update(id: string, data: UpdateProductInput) {
    await this.getById(id);

    if (data.categoryId) {
      const category = await categoryRepository.findById(data.categoryId);
      if (!category) throw ApiError.badRequest('Category does not exist');
    }

    const { categoryId, name, ...rest } = data;

    return productRepository.update(id, {
      ...rest,
      ...(name && { name, slug: await uniqueSlugFor(name, id) }),
      ...(categoryId && { category: { connect: { id: categoryId } } }),
    });
  },

  async delete(id: string) {
    await this.getById(id);
    await productRepository.delete(id);
  },
};
