import { apiClient } from '../apiClient';
import type { AdminUser } from '@/types';

export const adminsApi = {
  list: () => apiClient.get<{ success: true; data: AdminUser[] }>('/admins'),

  create: (data: { fullName: string; email: string; password: string }) =>
    apiClient.post<{ success: true; data: AdminUser }>('/admins', data),

  revoke: (id: string) => apiClient.delete<{ success: true }>(`/admins/${id}`),
};
