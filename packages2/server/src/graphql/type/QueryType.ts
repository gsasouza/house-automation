import { NodeField } from '../interface/NodeInterface';
import BoardConnection from '../modules/board/BoardConnection';
import * as BoardLoader from '../modules/board/BoardLoader';
import DeviceConnection from '../modules/device/DeviceConnection';
import * as DeviceLoader from '../modules/device/DeviceLoader';
import RoomConnection from '../modules/room/RoomConnection';
import * as RoomLoader from '../modules/room/RoomLoader';
import UserConnection from '../modules/user/UserConnection';
import * as UserLoader from '../modules/user/UserLoader';
import UserType from '../modules/user/UserType';

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    me: {
      type: UserType,
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
