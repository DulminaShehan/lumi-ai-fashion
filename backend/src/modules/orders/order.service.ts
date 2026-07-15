import { OrderStatus } from '../../../generated/prisma/client';
import { ApiError } from '../../utils/ApiError';
import { OrderListFilters, orderRepository } from './order.repository';

export const orderService = {
  list(filters: OrderListFilters) {
    return orderRepository.findAll(filters);
  },

  async getById(id: string) {
    const order = await orderRepository.findById(id);
    if (!order) throw ApiError.notFound('Order not found');
    return order;
  },

  async updateStatus(id: string, status: OrderStatus) {
    await this.getById(id);
    return orderRepository.updateStatus(id, status);
  },
};
