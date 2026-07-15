import { OrderStatus, Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../config/prisma';

export interface OrderListFilters {
  page: number;
  limit: number;
  status?: OrderStatus;
}

export const orderRepository = {
  async findAll(filters: OrderListFilters) {
    const where: Prisma.OrderWhereInput = {
      ...(filters.status && { status: filters.status }),
    };

    const [items, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: { select: { id: true, fullName: true, email: true } },
          items: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
      }),
      prisma.order.count({ where }),
    ]);

    return { items, total };
  },

  findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, fullName: true, email: true, phone: true } },
        items: { include: { product: { select: { id: true, slug: true } } } },
      },
    });
  },

  updateStatus(id: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id },
      data: { status },
      include: {
        user: { select: { id: true, fullName: true, email: true } },
        items: true,
      },
    });
  },
};
