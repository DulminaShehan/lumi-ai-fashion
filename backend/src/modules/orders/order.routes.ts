import { Router } from 'express';
import { validateBody } from '../../middleware/validate.middleware';
import { orderController } from './order.controller';
import { updateOrderStatusSchema } from './order.schema';

export const orderRoutes = Router();

orderRoutes.get('/', orderController.list);
orderRoutes.get('/:id', orderController.getById);
orderRoutes.patch('/:id/status', validateBody(updateOrderStatusSchema), orderController.updateStatus);
