import { Router } from 'express';
import { validateBody } from '../../middleware/validate.middleware';
import { productController } from './product.controller';
import { createProductSchema, updateProductSchema } from './product.schema';

export const productRoutes = Router();

productRoutes.get('/', productController.list);
productRoutes.get('/:id', productController.getById);
productRoutes.post('/', validateBody(createProductSchema), productController.create);
productRoutes.put('/:id', validateBody(updateProductSchema), productController.update);
productRoutes.delete('/:id', productController.delete);
