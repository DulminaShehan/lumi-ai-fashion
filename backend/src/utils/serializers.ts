import { UserModel } from '../../generated/prisma/models';

export function toPublicUser(user: UserModel) {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}
