import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { categoryService } from './category.service';

export const categoryController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    const categories = await categoryService.list();
    res.json({ success: true, data: categories });
  }),

  getById: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const category = await categoryService.getById(req.params.id);
    res.json({ success: true, data: category });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.create(req.body);
    res.status(201).json({ success: true, data: category });
  }),

  update: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const category = await categoryService.update(req.params.id, req.body);
    res.json({ success: true, data: category });
  }),

  delete: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await categoryService.delete(req.params.id);
    res.json({ success: true, data: null });
  }),
};
