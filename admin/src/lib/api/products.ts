import { apiClient } from '../apiClient';
import type { PaginatedResponse, Product, ProductInput } from '@/types';

export interface ProductListParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
}

function toQueryString(params: ProductListParams): string {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.categoryId) query.set('categoryId', params.categoryId);
  if (params.search) query.set('search', params.search);
  const qs = query.toString();
  return qs ? `?${qs}` : '';
}

export const productsApi = {
  list: (params: ProductListParams = {}) =>
    apiClient.get<PaginatedResponse<Product>>(`/products${toQueryString(params)}`),

  getById: (id: string) => apiClient.get<{ success: true; data: Product }>(`/products/${id}`),

  create: (data: ProductInput) => apiClient.post<{ success: true; data: Product }>('/products', data),

  update: (id: string, data: Partial<ProductInput>) =>
    apiClient.put<{ success: true; data: Product }>(`/products/${id}`, data),

  remove: (id: string) => apiClient.delete<{ success: true }>(`/products/${id}`),
};
