import { User, IUser, IAdminUser, AdminUser } from '@housejs/shared';

import { JWT_SECRET } from './config';

import jwt from 'jsonwebtoken';

export const USER_TYPES = {
  USER: 'USER',
  ADMIN_USER: 'ADMIN_USER',
};

export async function getUser(token: string) {
  if (!token) return { user: null };

  try {
    const { type, id } = jwt.verify(token.substring(4), JWT_SECRET);

    switch (type) {
      case USER_TYPES.USER: {
        const user = await User.findOne({ _id: id });
        return { user: { ...user, type } };
      }
      case USER_TYPES.ADMIN_USER: {
        const user = await AdminUser.findOne({ _id: id });
        return { user: { ...user, type } };
      }
      default:
        return { user: null };
    }
  } catch (err) {
    return { user: null };
  }
}

export const authenticatedMiddleware = async (ctx, next) => {
  const { authorization } = ctx.header;
  const { user } = await getUser(authorization);
  ctx.user = user;
  await next();
};

export const generateToken = (user: IUser | IAdminUser, type: string = USER_TYPES.USER) =>
  `JWT ${jwt.sign({ id: user._id, type }, JWT_SECRET)}`;
