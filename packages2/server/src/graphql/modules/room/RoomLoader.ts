import { Room as RoomModel, IRoom } from '@housejs/shared';

import { GraphQLContext, Types } from '../../../common/types';
import { DataLoaderKey } from '../../loaders';

import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import escapeStringRegexp from 'escape-string-regexp';
import { ConnectionArguments } from 'graphql-relay';

export { IRoom } from '@housejs/shared';

export default class Room {
  id: string;
  _id: string;
  name: string;
  type: string;
  createdBy: string;

  constructor(data: IRoom) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.type = data.type;
    this.createdBy = data.createdBy;
  }
}

export const getLoader = () => new DataLoader<DataLoaderKey, IRoom>(ids => mongooseLoader(RoomModel, ids as string[]));

const viewerCanSee = context => !!context.user;

export const load = async (context: GraphQLContext, id: DataLoaderKey): Promise<Room | null> => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.RoomLoader.load(id);
    if (!data) return null;
    return viewerCanSee(context) ? new Room(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.RoomLoader.clear(id.toString());

interface LoadRoomsArgs extends ConnectionArguments {
  search?: string;
}

export const loadRooms = async (context: any, args: LoadRoomsArgs) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${escapeStringRegexp(args.search)}`, 'ig') } } : {};
  const rooms = RoomModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: rooms,
    context,
    args,
    loader: load,
  });
};
