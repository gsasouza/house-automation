import { NodeField } from '../interface/NodeInterface';
import AdminUser from '../modules/admimUser/AdminUserLoader';
import AdminUserType from '../modules/admimUser/AdminUserType';
import BoardConnection from '../modules/board/BoardConnection';
import * as BoardLoader from '../modules/board/BoardLoader';
import DeviceConnection from '../modules/device/DeviceConnection';
import * as DeviceLoader from '../modules/device/DeviceLoader';
import RoomConnection from '../modules/room/RoomConnection';
import * as RoomLoader from '../modules/room/RoomLoader';
import UserConnection from '../modules/user/UserConnection';
import User, * as UserLoader from '../modules/user/UserLoader';
import UserType from '../modules/user/UserType';

import { GraphQLObjectType, GraphQLString, GraphQLUnionType } from 'graphql';
import { connectionArgs } from 'graphql-relay';

const MeType = new GraphQLUnionType({
  name: 'Me',
  types: [UserType, AdminUserType],
  resolveType(value) {
    if (value instanceof User) {
      return UserType;
    }
    if (value instanceof AdminUser) {
      return AdminUserType;
    }
    return null;
  },
});

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    me: {
      type: MeType,
      resolve: (_, args, context) => context.user,
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => UserLoader.loadUsers(context, args),
    },
    rooms: {
      type: RoomConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => RoomLoader.loadRooms(context, args),
    },
    boards: {
      type: BoardConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => BoardLoader.loadBoards(context, args),
    },
    devices: {
      type: DeviceConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => DeviceLoader.loadDevices(context, args),
    },
  }),
});
