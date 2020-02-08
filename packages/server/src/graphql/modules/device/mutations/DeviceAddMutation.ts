import { Device } from '@housejs/shared';

import DeviceConnection from '../DeviceConnection';
import * as DeviceLoader from '../DeviceLoader';

import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId, toGlobalId, fromGlobalId } from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'DeviceAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    pin: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    board: {
      type: new GraphQLNonNull(GraphQLID),
    },
    room: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ name, type, pin, board, room }, context) => {
    const { user } = context;
    const device = await Device.findOne({ name });

    if (!user) {
      return {
        id: null,
        error: 'UNAUTHENTICATED_USER',
      };
    }

    if (device) {
      return {
        id: null,
        error: 'BOARD_IO_ALREADY_EXISTS',
      };
    }

    try {
      const device = await Device.create({
        name,
        type,
        pin,
        board: fromGlobalId(board).id,
        room: fromGlobalId(room).id,
        createdBy: user.id,
      });
      return {
        id: device._id,
        error: null,
      };
    } catch (error) {
      return {
        id: null,
        error,
      };
    }
  },
  outputFields: {
    deviceEdge: {
      type: DeviceConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const device = await DeviceLoader.load(context, id);
        if (!device) {
          return null;
        }
        return {
          cursor: toGlobalId('Device', device.id),
          node: device,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
