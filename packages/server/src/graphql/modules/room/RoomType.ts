import { NodeInterface } from '../../interface/NodeInterface';

import DeviceConnection from '../device/DeviceConnection';
import * as DeviceLoader from '../device/DeviceLoader';
import * as UserLoader from '../user/UserLoader';
import UserType from '../user/UserType';

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { connectionArgs, globalIdField } from 'graphql-relay';

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
      resolve: async room => DeviceLoader.loadDevicesByRoomCount(room._id),
    },
    boardIosConnected: {
      type: DeviceConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (room, args, ctx) => DeviceLoader.loadDevicesByRoom(ctx, args, room._id),
    },
  }),
  interfaces: () => [NodeInterface],
});

export default RoomType;
