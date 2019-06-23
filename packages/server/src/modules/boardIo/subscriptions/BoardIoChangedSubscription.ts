import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

import BoardIoConnection from '../BoardIoConnection';
import pubSub, { EVENTS } from '../../../pubsub/pubSub';

const BoardIoChangedPayloadType = new GraphQLObjectType({
  name: 'BoardIoChangedPayload',
  fields: () => ({
    boardIoEdge: {
      type: BoardIoConnection.edgeType,
      resolve: ({ boardIo }) =>  ({
        cursor: offsetToCursor(boardIo.id),
        node: boardIo,
      })
    },
  }),
});

const boardIoChangedSubscription = {
  type: BoardIoChangedPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.BOARD_IO.CHANGED),
};

export default boardIoChangedSubscription;
