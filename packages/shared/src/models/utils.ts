import bcrypt from 'bcrypt';

import { IUser } from './UserModel';
import { IAdminUser } from './AdminUserModel';

type This = IUser | IAdminUser;

export function hashPassword(this: This, next) {
  if (!this.isModified('password')) return next();
  if (!this.password) return next();
  return this.encryptPassword(this.password)
    .then((hash: string) => {
      this.password = hash;
      next();
    })
    .catch((err: Error) => next(err));
}

export function authenticate(this: This, plainTextPassword: string) {
  return bcrypt.compare(plainTextPassword, this.password);
}

export function encryptPassword(password: string) {
  return bcrypt.hash(password, 8);
}
