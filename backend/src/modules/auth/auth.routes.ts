import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import { validateBody } from '../../middleware/validate.middleware';
import { authController } from './auth.controller';
import { loginSchema, refreshSchema, registerSchema } from './auth.schema';

export const authRoutes = Router();

authRoutes.post('/register', validateBody(registerSchema), authController.register);
authRoutes.post('/login', validateBody(loginSchema), authController.login);
authRoutes.post('/refresh', validateBody(refreshSchema), authController.refresh);
authRoutes.post('/logout', validateBody(refreshSchema), authController.logout);
authRoutes.get('/me', requireAuth, authController.me);
