import { Router } from 'express';
import { validateBody } from '../../middleware/validate.middleware';
import { adminController } from './admin.controller';
import { createAdminSchema } from './admin.schema';

export const adminRoutes = Router();

adminRoutes.get('/', adminController.list);
adminRoutes.post('/', validateBody(createAdminSchema), adminController.create);
adminRoutes.delete('/:id', adminController.revoke);
