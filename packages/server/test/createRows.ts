import { AdminUserModel, IAdminUser } from '@housejs/shared';

export const createAdminUser = (payload: Partial<IAdminUser> = {}) => {
  const count = global.__COUNTERS__.getValue('AdminUser');
  global.__COUNTERS__.increase('AdminUser');
  return new AdminUserModel({
    name: `AdminUser#${count}`,
    username: `admin_user#${count}`,
    password: 'password',
    email: `admin_user#${count}@domain.com`,
    ...payload,
  }).save();
};
