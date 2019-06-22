import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { ConnectionArguments } from 'graphql-relay';
import { Room as RoomModel } from '@gsasouza/shared';

type RoomType = {
  id: string,
  _id: string,
  name: string
  type: string
  createdBy: string
};

export default class Room {
  id: string;
  _id: string;
  name: string;
  type: string;
  createdBy: string;

  constructor(data: RoomType) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.type = data.type;
    this.createdBy = data.createdBy;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(RoomModel, ids));

const viewerCanSee = () => true;

export const load = async (context: any, id: string): Promise<any> => {
  if (!id) {
    return null;
  }
  let data;
  try {
    data = await context.dataloaders.RoomLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new Room(data) : null;
};

export const clearCache = ({ dataloaders }: any, id: string) => {
  return dataloaders.RoomLoader.clear(id.toString());
};

export const loadRooms = async (context: any, args: ConnectionArguments & { search?: string }) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
  const rooms = RoomModel.find(where, { _id: 1 }).sort({ type: -1 });

  return connectionFromMongoCursor({
    cursor: rooms,
    context,
    args,
    loader: load,
  });
};
