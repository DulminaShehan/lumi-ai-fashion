import { ApiError } from '../../utils/ApiError';
import { slugify } from '../../utils/slugify';
import { categoryRepository } from './category.repository';

export const categoryService = {
  list() {
    return categoryRepository.findAll();
  },

  async getById(id: string) {
    const category = await categoryRepository.findById(id);
    if (!category) throw ApiError.notFound('Category not found');
    return category;
  },

  async create(data: { name: string; imageUrl?: string }) {
    const slug = slugify(data.name);
    const existing = await categoryRepository.findBySlug(slug);
    if (existing) throw ApiError.conflict('A category with this name already exists');

    return categoryRepository.create({ name: data.name, slug, imageUrl: data.imageUrl });
  },

  async update(id: string, data: { name?: string; imageUrl?: string }) {
    await this.getById(id);

    const updates: { name?: string; slug?: string; imageUrl?: string } = { ...data };
    if (data.name) {
      const slug = slugify(data.name);
      const existing = await categoryRepository.findBySlug(slug);
      if (existing && existing.id !== id) {
        throw ApiError.conflict('A category with this name already exists');
      }
      updates.slug = slug;
    }

    return categoryRepository.update(id, updates);
  },

  async delete(id: string) {
    await this.getById(id);
    const productCount = await categoryRepository.countProducts(id);
    if (productCount > 0) {
      throw ApiError.badRequest('Cannot delete a category that still has products assigned to it');
    }
    await categoryRepository.delete(id);
  },
};
