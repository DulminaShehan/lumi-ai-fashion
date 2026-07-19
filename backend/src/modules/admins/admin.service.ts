import bcrypt from 'bcrypt';
import { ApiError } from '../../utils/ApiError';
import { adminRepository } from './admin.repository';

const BCRYPT_ROUNDS = 12;

export const adminService = {
  list() {
    return adminRepository.findAllAdmins();
  },

  async create(data: { email: string; password: string; fullName: string }) {
    const existing = await adminRepository.findByEmail(data.email);
    if (existing) {
      throw ApiError.conflict('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);
    return adminRepository.createAdmin({ ...data, password: passwordHash });
  },

  async revoke(id: string) {
    const user = await adminRepository.findById(id);
    if (!user || user.role !== 'ADMIN') {
      throw ApiError.notFound('Admin not found');
    }

    const adminCount = await adminRepository.countAdmins();
    if (adminCount <= 1) {
      throw ApiError.badRequest('Cannot remove the last remaining admin');
    }

    await adminRepository.revokeAdmin(id);
  },
};
