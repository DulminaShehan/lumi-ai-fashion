import { prisma } from '../../config/prisma';

export const adminRepository = {
  findAllAdmins() {
    return prisma.user.findMany({
      where: { role: 'ADMIN' },
      orderBy: { createdAt: 'asc' },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  createAdmin(data: { email: string; password: string; fullName: string }) {
    return prisma.user.create({ data: { ...data, role: 'ADMIN' } });
  },

  revokeAdmin(id: string) {
    return prisma.user.update({ where: { id }, data: { role: 'CUSTOMER' } });
  },

  countAdmins() {
    return prisma.user.count({ where: { role: 'ADMIN' } });
  },
};
