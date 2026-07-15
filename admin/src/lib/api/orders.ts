import { apiClient } from '../apiClient';
import type { Order, OrderStatus, PaginatedResponse } from '@/types';

export interface OrderListParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}

function toQueryString(params: OrderListParams): string {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.status) query.set('status', params.status);
  const qs = query.toString();
  return qs ? `?${qs}` : '';
}

export const ordersApi = {
  list: (params: OrderListParams = {}) =>
    apiClient.get<PaginatedResponse<Order>>(`/orders${toQueryString(params)}`),

  getById: (id: string) => apiClient.get<{ success: true; data: Order }>(`/orders/${id}`),

  updateStatus: (id: string, status: OrderStatus) =>
    apiClient.patch<{ success: true; data: Order }>(`/orders/${id}/status`, { status }),
};
