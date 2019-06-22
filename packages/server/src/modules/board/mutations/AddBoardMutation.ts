import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, toGlobalId, fromGlobalId } from 'graphql-relay';
import { Board } from '@gsasouza/shared';
import BoardConnection from '../BoardConnection'
import * as BoardLoader from '../BoardLoader'

export default mutationWithClientMutationId({
  name: 'AddBoard',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    port: {
      type: GraphQLString,
    },
    host: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ name, type, port, host }, context ) => {
    const { user } = context;
    const board = await Board.findOne({ name });

    if (!user) {
      return {
        id: null,
        error: 'UNAUTHENTICATED_USER',
      };
    }

    if (board) {
      return {
        id: null,
        error: 'ROOM_ALREADY_EXISTS',
      };
    }

    try {
      const board = await Board.create({
        name,
        type,
        port,
        host,
        createdBy: user.id
      });
      return {
        id: board._id,
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
    boardEdge: {
      type: BoardConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const board = await BoardLoader.load(context, id)
        if (!board) {
          return null;
        }
        return {
          cursor: toGlobalId('Board', board.id),
          node: board,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
