import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeField } from './NodeInterface';

import UserType from '../modules/user/UserType';
import UserConnection from '../modules/user/UserConnection';
import * as UserLoader from '../modules/user/UserLoader';
import RoomConnection from '../modules/room/RoomConnection'
import * as RoomLoader from '../modules/room/RoomLoader'
import * as BoardLoader from '../modules/board/BoardLoader'
import BoardConnection from '../modules/board/BoardConnection'
import * as BoardIoLoader from '../modules/boardIo/BoardIoLoader'
import BoardIoConnection from '../modules/boardIo/BoardIoConnection'


export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    me: {
      type: UserType,
      resolve: (_, args, context: any) => {
        return context.user
      },
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
    boardIos: {
      type: BoardIoConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => BoardIoLoader.loadBoardIos(context, args),
    },
  })
});
