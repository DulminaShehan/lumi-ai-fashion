import { Request, Response } from 'express';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';
import { toPublicUser } from '../../utils/serializers';
import { authRepository } from './auth.repository';
import { authService } from './auth.service';

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    res.status(201).json({
      success: true,
      data: { user: toPublicUser(user), accessToken, refreshToken },
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(email, password);
    res.json({
      success: true,
      data: { user: toPublicUser(user), accessToken, refreshToken },
    });
  }),

  refresh: asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.json({
      success: true,
      data: {
        user: toPublicUser(result.user),
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  }),

  logout: asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.json({ success: true, data: null });
  }),

  me: asyncHandler(async (req: Request, res: Response) => {
    const user = await authRepository.findUserById(req.user!.id);
    if (!user) throw ApiError.notFound('User not found');
    res.json({ success: true, data: { user: toPublicUser(user) } });
  }),
};
