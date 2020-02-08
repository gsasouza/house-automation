import { Device as DeviceModel, IDevice } from '@housejs/shared';

import { GraphQLContext, Types } from '../../../common/types';

import { DataLoaderKey } from '../../loaders';

import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import escapeStringRegexp from 'escape-string-regexp';
import { ConnectionArguments } from 'graphql-relay';

export { IDevice } from '@housejs/shared';

export default class Device {
  id: string;
  _id: string;
  name: string;
  type: string;
  pin: string;
  board: string;
  state: boolean;
  room: string;
  createdBy: string;

  constructor(data: IDevice) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.type = data.type;
    this.pin = data.pin;
    this.board = data.board;
    this.state = data.state;
    this.room = data.room;
    this.createdBy = data.createdBy;
  }
}

export const getLoader = () =>
  new DataLoader<DataLoaderKey, IDevice>(ids => mongooseLoader(DeviceModel, ids as string[]));

const viewerCanSee = context => !!context.user;

export const load = async (context: GraphQLContext, id: DataLoaderKey): Promise<Device | null> => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.DeviceLoader.load(id);
    if (!data) return null;
    return viewerCanSee(context) ? new Device(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.DeviceLoader.clear(id.toString());

interface LoadDeviceArgs extends ConnectionArguments {
  search?: string;
}

export const loadDevices = async (context: GraphQLContext, args: LoadDeviceArgs) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${escapeStringRegexp(args.search)}`, 'ig') } } : {};
  const devices = DeviceModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: devices,
    context,
    args,
    loader: load,
  });
};

export const loadDevicesByRoomCount = async (id: string) => {
  const aggregatePipeline = [
    { $match: { room: id } },
    {
      $lookup: {
        from: 'boards',
        localField: 'board',
        foreignField: '_id',
        as: 'board',
      },
    },
    { $match: { 'board.connected': true } },
    { $count: 'total' },
  ];
  const result = await DeviceModel.aggregate(aggregatePipeline);
  return result[0] ? result[0].total : 0;
};

export const loadDevicesByRoom = async (context: any, args: ConnectionArguments & { search?: string }, id: string) => {
  const where = { room: id };
  const devices = DeviceModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: devices,
    context,
    args,
    loader: load,
  });
};
