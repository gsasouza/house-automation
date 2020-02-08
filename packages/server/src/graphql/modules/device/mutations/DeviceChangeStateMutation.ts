import { Device } from '@housejs/shared';

import DeviceConnection from '../DeviceConnection';
import * as DeviceLoader from '../DeviceLoader';

import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId, toGlobalId } from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'DeviceChangeState',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    state: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
  mutateAndGetPayload: async ({ id, state }, context) => {
    const { user } = context;
    if (!user) {
      return {
        id: null,
        error: 'UNAUTHENTICATED_USER',
      };
    }

    try {
      const device = await Device.findOne({ _id: fromGlobalId(id).id });

      if (!device) {
        return {
          id: null,
          error: 'BOARD_IO_NOT_FOUND',
        };
      }
      // //@TODO handleError
      // const { status, response } = await publishMessage(context.pubnub, 'cloud:board_io', { id: device._id, state });

      return {
        id: device.id,
        state,
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
      resolve: async ({ id, state }, _, context) => {
        const device = await DeviceLoader.load(context, id);
        if (!device) return null;
        return {
          cursor: toGlobalId('Device', device.id),
          node: {
            ...device,
            state,
          },
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
