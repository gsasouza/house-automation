import { NodeInterface } from '../../interface/NodeInterface';

import * as BoardLoader from '../board/BoardLoader';
import BoardType from '../board/BoardType';
import * as RoomLoader from '../room/RoomLoader';
import * as UserLoader from '../user/UserLoader';

import UserType from '../user/UserType';

import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

const DeviceType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Device',
  description: 'Device data',
  fields: () => ({
    id: globalIdField('Device'),
    _id: {
      type: GraphQLString,
      resolve: device => device._id,
    },
    name: {
      type: GraphQLString,
      resolve: device => device.name,
    },
    type: {
      type: GraphQLString,
      resolve: device => device.type,
    },
    board: {
      type: BoardType,
      resolve: (device, _, context) => BoardLoader.load(context, device.board),
    },
    pin: {
      type: GraphQLString,
      resolve: device => device.pin,
    },
    state: {
      type: GraphQLBoolean,
      resolve: device => device.state,
    },
    connected: {
      type: GraphQLBoolean,
      resolve: async (device, _, context) => {
        const board = await BoardLoader.load(context, device.board);
        if (!board) return false;
        return board.connected;
      },
    },
    room: {
      type: DeviceType,
      resolve: (device, _, context) => RoomLoader.load(context, device.room),
    },
    createdBy: {
      type: UserType,
      resolve: (device, _, ctx) => UserLoader.load(ctx, device.createdBy),
    },
  }),
  interfaces: () => [NodeInterface],
});

export default DeviceType;
