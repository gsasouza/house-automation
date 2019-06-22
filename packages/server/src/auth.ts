import jwt from 'jsonwebtoken';
import { JWT_SECRET, User } from '@gsasouza/shared';

export async function getUser(token: string) {
  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token.substring(4), JWT_SECRET);

    const user = await User.findOne({ _id: decodedToken.id });

    return {
      user,
    };
  } catch (err) {
    return { user: null };
  }
}

export const authenticatedMiddleware = async (ctx, next) => {
  const { authorization } = ctx.header;
  const { user } = await getUser(authorization);
  ctx.user = user;
  await next();
}
type UserType = {
  _id: string,
};

export function generateToken(user: UserType) {
  return `JWT ${jwt.sign({ id: user._id }, JWT_SECRET)}`;
}
