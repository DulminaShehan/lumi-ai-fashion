import { Router } from 'express';
import { validateBody } from '../../middleware/validate.middleware';
import { categoryController } from './category.controller';
import { createCategorySchema, updateCategorySchema } from './category.schema';

export const categoryRoutes = Router();

categoryRoutes.get('/', categoryController.list);
categoryRoutes.get('/:id', categoryController.getById);
categoryRoutes.post('/', validateBody(createCategorySchema), categoryController.create);
categoryRoutes.put('/:id', validateBody(updateCategorySchema), categoryController.update);
categoryRoutes.delete('/:id', categoryController.delete);
