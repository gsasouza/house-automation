import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { ConnectionArguments } from 'graphql-relay';
import { User as UserModel } from '@gsasouza/shared';

type UserType = {
  id: string,
  _id: string,
  name: string
  username: string
  isAdmin: boolean
};

export default class User {
  id: string;
  _id: string;
  name: string
  username: string
  isAdmin: boolean

  constructor(data: UserType) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.isAdmin = data.isAdmin;
    this.username = data.username;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(UserModel, ids));

const viewerCanSee = () => true;

export const load = async (context: any, id: string): Promise<any> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.UserLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new User(data) : null;
};

export const clearCache = ({ dataloaders }: any, id: string) => {
  return dataloaders.UserLoader.clear(id.toString());
};

export const loadUsers = async (context: any, args: ConnectionArguments & { search?: string }) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
  const users = UserModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};
