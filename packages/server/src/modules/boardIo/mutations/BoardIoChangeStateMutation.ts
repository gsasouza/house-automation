import {GraphQLString, GraphQLNonNull, GraphQLID, GraphQLBoolean} from 'graphql';
import {mutationWithClientMutationId, fromGlobalId, toGlobalId} from 'graphql-relay';
import { BoardIo, publishMessage } from '@gsasouza/shared';
import * as BoardIoLoader from '../BoardIoLoader'
import BoardIoConnection from '../BoardIoConnection'

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
  mutateAndGetPayload: async ({ id, state }, context ) => {
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
      //@TODO handleError
      const { status, response } = await publishMessage(context.pubnub, 'cloud:board_io', { id: boardIo._id, state })

      return {
        id: boardIo.id,
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
