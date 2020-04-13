import { GraphQLContext } from '../../common/types';
import Board, * as BoardLoader from '../modules/board/BoardLoader';
import BoardType from '../modules/board/BoardType';
import Device, * as DeviceLoader from '../modules/device/DeviceLoader';
import DeviceType from '../modules/device/DeviceType';
import Place, * as PlaceLoader from '../modules/place/PlaceLoader';
import PlaceType from '../modules/place/PlaceType';
import Room, * as RoomLoader from '../modules/room/RoomLoader';
import RoomType from '../modules/room/RoomType';
import UserType from '../modules/user/UserConnection';
import User, * as UserLoader from '../modules/user/UserLoader';

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import { AdminUserLoader } from '../loaders';
import AdminUser from '../modules/admimUser/AdminUserLoader';
import AdminUserType from '../modules/admimUser/AdminUserType';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  async (globalId, context: GraphQLContext) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === 'AdminUser') return await AdminUserLoader.load(context, id);
    if (type === 'User') return await UserLoader.load(context, id);
    if (type === 'Room') return await RoomLoader.load(context, id);
    if (type === 'Board') return await BoardLoader.load(context, id);
    if (type === 'Device') return await DeviceLoader.load(context, id);
    if (type === 'Place') return await PlaceLoader.load(context, id);
    return null;
  },
  obj => {
    if (obj instanceof AdminUser) {
      return AdminUserType;
    }
    if (obj instanceof User) {
      return UserType;
    }
    if (obj instanceof Board) {
      return BoardType;
    }
    if (obj instanceof Device) {
      return DeviceType;
    }
    if (obj instanceof Room) {
      return RoomType;
    }
    if (obj instanceof Place) {
      return PlaceType;
    }
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
export const NodesField = nodesField;
