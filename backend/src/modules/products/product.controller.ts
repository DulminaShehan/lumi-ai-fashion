import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { productService } from './product.service';
import { listProductsQuerySchema } from './product.schema';

export const productController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const filters = listProductsQuerySchema.parse(req.query);
    const { items, total } = await productService.list(filters);
    res.json({
      success: true,
      data: items,
      meta: { page: filters.page, limit: filters.limit, total, totalPages: Math.ceil(total / filters.limit) },
    });
  }),

  getById: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const product = await productService.getById(req.params.id);
    res.json({ success: true, data: product });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.create(req.body);
    res.status(201).json({ success: true, data: product });
  }),

  update: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const product = await productService.update(req.params.id, req.body);
    res.json({ success: true, data: product });
  }),

  delete: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await productService.delete(req.params.id);
    res.json({ success: true, data: null });
  }),
};
