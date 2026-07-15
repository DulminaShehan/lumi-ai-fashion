import { apiClient } from '../apiClient';
import type { Category } from '@/types';

export const categoriesApi = {
  list: () => apiClient.get<{ success: true; data: Category[] }>('/categories'),

  create: (data: { name: string; imageUrl?: string }) =>
    apiClient.post<{ success: true; data: Category }>('/categories', data),

  update: (id: string, data: { name?: string; imageUrl?: string }) =>
    apiClient.put<{ success: true; data: Category }>(`/categories/${id}`, data),

  remove: (id: string) => apiClient.delete<{ success: true }>(`/categories/${id}`),
};
