import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId, toGlobalId } from 'graphql-relay';
import { BoardIo } from '../BoardIOModel';
import * as BoardIoLoader from '../BoardIoLoader'
import BoardIoConnection from '../BoardIoConnection'
import { EVENTS, publish } from "../../../pubsub/pubSub";
import BoardIoChangedEvent from "../../../pubsub/BoardIoChangedEvent";

export default mutationWithClientMutationId({
  name: 'BoardIoChangeState',
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
      const boardIo = await BoardIo.findOne({ _id: fromGlobalId(id).id });

      if (!boardIo) {
        return {
          id: null,
          error: 'BOARD_IO_NOT_FOUND',
        };
      }

      await publish(user.username, { event: EVENTS.BOARD_IO.CHANGED, board: boardIo.board, pin: boardIo.pin, state })

      return {
        id: boardIo._id,
        state,
        error: null,
      }
    } catch (error) {
      return {
        id: null,
        error,
      }
    }
  },
  outputFields: {
    boardIoEdge: {
      type: BoardIoConnection.edgeType,
      resolve: async ({ id, state }, _, context) => {
        const boardIo = await BoardIoLoader.load(context, id)
        if (!boardIo) {
          return null;
        }
        return {
          cursor: toGlobalId('BoardIo', boardIo.id),
          node: {
            ...boardIo,
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
