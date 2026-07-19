import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { toPublicUser } from '../../utils/serializers';
import { adminService } from './admin.service';

export const adminController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    const admins = await adminService.list();
    res.json({ success: true, data: admins.map(toPublicUser) });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const admin = await adminService.create(req.body);
    res.status(201).json({ success: true, data: toPublicUser(admin) });
  }),

  revoke: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await adminService.revoke(req.params.id);
    res.json({ success: true, data: null });
  }),
};
