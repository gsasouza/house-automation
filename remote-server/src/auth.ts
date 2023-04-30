import jwt from 'jsonwebtoken';
import { User } from './modules/user/UserModel';
import { NextFunction, Request, Response } from "express";

export const JWT_SECRET = process.env.JWT_SECRET ?? 'SECRET_KEY'

export async function getUser(token: string) {
  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token.substring(4), JWT_SECRET) as { id: string };

    const user = await User.findOne({ _id: decodedToken.id });

    return {
      user,
    };
  } catch (err) {
    return { user: null };
  }
}

export const authenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const { user } = await getUser(authorization);
  req.context = {
    ...req.context,
    user
  };
  await next();
}
type UserType = {
  _id: string,
};

export function generateToken(user: UserType) {
  return `JWT ${jwt.sign({ id: user._id }, JWT_SECRET)}`;
}
