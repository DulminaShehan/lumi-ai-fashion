import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { orderService } from './order.service';
import { listOrdersQuerySchema } from './order.schema';

export const orderController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const filters = listOrdersQuerySchema.parse(req.query);
    const { items, total } = await orderService.list(filters);
    res.json({
      success: true,
      data: items,
      meta: { page: filters.page, limit: filters.limit, total, totalPages: Math.ceil(total / filters.limit) },
    });
  }),

  getById: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const order = await orderService.getById(req.params.id);
    res.json({ success: true, data: order });
  }),

  updateStatus: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const order = await orderService.updateStatus(req.params.id, req.body.status);
    res.json({ success: true, data: order });
  }),
};
