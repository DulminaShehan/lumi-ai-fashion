import type { OrderStatus } from '@/types';

export const ORDER_STATUSES: OrderStatus[] = [
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
];

export const ORDER_STATUS_TONE: Record<OrderStatus, 'neutral' | 'gold' | 'blue' | 'green' | 'red'> = {
  PENDING: 'neutral',
  CONFIRMED: 'blue',
  PROCESSING: 'blue',
  SHIPPED: 'gold',
  DELIVERED: 'green',
  CANCELLED: 'red',
  REFUNDED: 'red',
};
