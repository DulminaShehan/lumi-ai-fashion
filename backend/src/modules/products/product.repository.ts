import { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../config/prisma';

export interface ProductListFilters {
  page: number;
  limit: number;
  categoryId?: string;
  search?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

function buildWhere(filters: ProductListFilters): Prisma.ProductWhereInput {
  return {
    ...(filters.categoryId && { categoryId: filters.categoryId }),
    ...(filters.isFeatured !== undefined && { isFeatured: filters.isFeatured }),
    ...(filters.isNewArrival !== undefined && { isNewArrival: filters.isNewArrival }),
    ...(filters.isBestSeller !== undefined && { isBestSeller: filters.isBestSeller }),
    ...(filters.search && {
      name: { contains: filters.search, mode: 'insensitive' },
    }),
  };
}

export const productRepository = {
  async findAll(filters: ProductListFilters) {
    const where = buildWhere(filters);
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
      }),
      prisma.product.count({ where }),
    ]);
    return { items, total };
  },

  findById(id: string) {
    return prisma.product.findUnique({ where: { id }, include: { category: true } });
  },

  findBySlug(slug: string) {
    return prisma.product.findUnique({ where: { slug } });
  },

  create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({ data, include: { category: true } });
  },

  update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({ where: { id }, data, include: { category: true } });
  },

  delete(id: string) {
    return prisma.product.delete({ where: { id } });
  },
};
