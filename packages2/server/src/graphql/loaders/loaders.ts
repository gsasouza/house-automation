import * as BoardLoader from '../modules/board/BoardLoader';
import * as DeviceLoader from '../modules/device/DeviceLoader';
import * as RoomLoader from '../modules/room/RoomLoader';
import * as UserLoader from '../modules/user/UserLoader';

import * as DataLoader from 'dataloader';
import { Types } from 'mongoose';

export type DataLoaderKey = string | object | Types.ObjectId;

export interface GraphQLDataloaders {
  DeviceLoader: DataLoader<DataLoaderKey, DeviceLoader.IDevice>;
  UserLoader: DataLoader<DataLoaderKey, UserLoader.IUser>;
  RoomLoader: DataLoader<DataLoaderKey, RoomLoader.IRoom>;
  BoardLoader: DataLoader<DataLoaderKey, BoardLoader.IBoard>;
}

export { UserLoader, RoomLoader, BoardLoader, DeviceLoader };
