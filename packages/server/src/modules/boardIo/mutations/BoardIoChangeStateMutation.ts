import {GraphQLString, GraphQLNonNull, GraphQLID, GraphQLBoolean} from 'graphql';
import {mutationWithClientMutationId, fromGlobalId, toGlobalId} from 'graphql-relay';
import { BoardIo } from '@gsasouza/shared';
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
      const boardIo = await BoardIo.findOneAndUpdate(
        { _id: fromGlobalId(id).id },
        { state }
        );

      if (!boardIo) {
        return {
          id: null,
          error: 'BOARD_IO_NOT_FOUND',
        };
      }

      return {
        id: boardIo.id,
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
      resolve: async ({ id }, _, context) => {
        const boardIo = await BoardIoLoader.load(context, id)
        if (!boardIo) {
          return null;
        }
        return {
          cursor: toGlobalId('BoardIo', boardIo.id),
          node: boardIo,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
