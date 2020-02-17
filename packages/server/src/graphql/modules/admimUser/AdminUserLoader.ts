import { AdminUser as AdminUserModel, IAdminUser } from '@housejs/shared';

import { GraphQLContext, Types } from '../../../common/types';
import { DataLoaderKey } from '../../loaders';

import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import escapeStringRegexp from 'escape-string-regexp';
import { ConnectionArguments } from 'graphql-relay';

export { IAdminUser } from '@housejs/shared';

export default class AdminUser {
  id: string;
  _id: string;
  name: string;
  username: string;
  email: string;

  constructor(data: IAdminUser) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.username = data.username;
  }
}

export const getLoader = () =>
  new DataLoader<DataLoaderKey, IAdminUser>(ids => mongooseLoader(AdminUserModel, ids as string[]));

const viewerCanSee = context => !!context.user;

export const load = async (context: GraphQLContext, id: DataLoaderKey): Promise<AdminUser | null> => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.AdminUserLoader.load(id);
    if (!data) return null;
    return viewerCanSee(context) ? new AdminUser(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.UserLoader.clear(id.toString());

interface LoadAdminUsersArgs extends ConnectionArguments {
  search?: string;
}

export const loadAdminUsers = async (context: any, args: LoadAdminUsersArgs) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${escapeStringRegexp(args.search)}`, 'ig') } } : {};
  const adminUsers = AdminUserModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: adminUsers,
    context,
    args,
    loader: load,
  });
};
