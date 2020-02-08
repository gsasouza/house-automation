import { User as UserModel, IUser } from '@housejs/shared';

import { GraphQLContext, Types } from '../../../common/types';
import { DataLoaderKey } from '../../loaders';

import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import escapeStringRegexp from 'escape-string-regexp';
import { ConnectionArguments } from 'graphql-relay';

export { IUser } from '@housejs/shared';

export default class User {
  id: string;
  _id: string;
  name: string;
  username: string;
  isAdmin: boolean;

  constructor(data: IUser) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.isAdmin = data.isAdmin;
    this.username = data.username;
  }
}

export const getLoader = () => new DataLoader<DataLoaderKey, IUser>(ids => mongooseLoader(UserModel, ids as string[]));

const viewerCanSee = context => !!context.user;

export const load = async (context: GraphQLContext, id: DataLoaderKey): Promise<User | null> => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.UserLoader.load(id);
    if (!data) return null;
    return viewerCanSee(context) ? new User(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.UserLoader.clear(id.toString());

interface LoadUsersArgs extends ConnectionArguments {
  search?: string;
}

export const loadUsers = async (context: any, args: LoadUsersArgs) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${escapeStringRegexp(args.search)}`, 'ig') } } : {};
  const users = UserModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};
