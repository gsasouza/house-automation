import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import {connectionArgs, globalIdField} from 'graphql-relay';
import { NodeInterface } from '../../schema/NodeInterface';

import * as UserLoader from '../user/UserLoader';
import UserType from '../user/UserType'
import * as BoardIoLoader from '../boardIo/BoardIoLoader';
import BoardIoType from '../boardIo/BoardIoType'
import BoardIoConnection from '../boardIo/BoardIoConnection'

const RoomType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Room',
  description: 'Room data',
  fields: () => ({
    id: globalIdField('Room'),
    _id: {
      type: GraphQLString,
      resolve: room => room._id,
    },
    name: {
      type: GraphQLString,
      resolve: room => room.name,
    },
    type: {
      type: GraphQLString,
      resolve: room => room.type,
    },
    createdBy: {
      type: UserType,
      resolve: async (room, _, ctx) => UserLoader.load(ctx, room.createdBy),
    },
    boardIosConnectedCount: {
      type: GraphQLInt,
      resolve: async room => BoardIoLoader.loadBoardIosByRoomCount(room._id)
    },
    boardIosConnected: {
      type: BoardIoConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (room, args, ctx) => BoardIoLoader.loadBoardIosByRoom(ctx, args, room._id),
    },

  }),
  interfaces: () => [NodeInterface],
});

export default RoomType;
