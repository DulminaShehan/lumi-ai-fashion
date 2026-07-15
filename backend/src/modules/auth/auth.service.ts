import bcrypt from 'bcrypt';
import { randomUUID, createHash } from 'crypto';
import ms from 'ms';
import { ApiError } from '../../utils/ApiError';
import { env } from '../../config/env';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { authRepository } from './auth.repository';
import { UserRole } from '../../../generated/prisma/enums';

const BCRYPT_ROUNDS = 12;

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

async function issueTokenPair(userId: string, role: UserRole) {
  const accessToken = signAccessToken({ sub: userId, role });

  const jti = randomUUID();
  const refreshToken = signRefreshToken({ sub: userId, jti });
  const expiresAt = new Date(Date.now() + ms(env.JWT_REFRESH_EXPIRES_IN as ms.StringValue));

  await authRepository.storeRefreshToken({
    tokenHash: hashToken(refreshToken),
    userId,
    expiresAt,
  });

  return { accessToken, refreshToken };
}

export const authService = {
  async register(data: { email: string; password: string; fullName: string }) {
    const existing = await authRepository.findUserByEmail(data.email);
    if (existing) {
      throw ApiError.conflict('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);
    const user = await authRepository.createUser({
      email: data.email,
      password: passwordHash,
      fullName: data.fullName,
    });

    const tokens = await issueTokenPair(user.id, user.role);
    return { user, ...tokens };
  },

  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const tokens = await issueTokenPair(user.id, user.role);
    return { user, ...tokens };
  },

  async refresh(refreshToken: string) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }

    const tokenHash = hashToken(refreshToken);
    const stored = await authRepository.findRefreshToken(tokenHash);

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw ApiError.unauthorized('Refresh token is no longer valid');
    }

    const user = await authRepository.findUserById(payload.sub);
    if (!user) {
      throw ApiError.unauthorized('Invalid refresh token');
    }

    await authRepository.revokeRefreshToken(tokenHash);
    const tokens = await issueTokenPair(user.id, user.role);
    return { user, ...tokens };
  },

  async logout(refreshToken: string) {
    const tokenHash = hashToken(refreshToken);
    const stored = await authRepository.findRefreshToken(tokenHash);
    if (stored && !stored.revokedAt) {
      await authRepository.revokeRefreshToken(tokenHash);
    }
  },
};
