import { graphqlPubSub, EVENTS } from '@housejs/pubsub';

import DeviceConnection from '../DeviceConnection';

import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

const DeviceChangeStatePayloadType = new GraphQLObjectType({
  name: 'DeviceChangedStatePayload',
  fields: () => ({
    deviceEdge: {
      type: DeviceConnection.edgeType,
      resolve: ({ device }) => ({
        cursor: offsetToCursor(device.id),
        node: device,
      }),
    },
  }),
});

const deviceChangedStateSubscription = {
  type: DeviceChangeStatePayloadType,
  subscribe: () => graphqlPubSub.asyncIterator(EVENTS.DEVICE.CHANGED),
};

export default deviceChangedStateSubscription;
