import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId, toGlobalId, fromGlobalId } from 'graphql-relay';
import { BoardIo } from '@gsasouza/shared';
import BoardIoConnection from '../BoardIoConnection'
import * as BoardIoLoader from '../BoardIoLoader'

export default mutationWithClientMutationId({
  name: 'AddBoardIo',
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
  mutateAndGetPayload: async ({ name, type, pin, board, room }, context ) => {
    const { user } = context;
    const boardIo = await BoardIo.findOne({ name });

    if (!user) {
      return {
        id: null,
        error: 'UNAUTHENTICATED_USER',
      };
    }

    if (boardIo) {
      return {
        id: null,
        error: 'ROOM_ALREADY_EXISTS',
      };
    }

    try {
      const boardIo = await BoardIo.create({
        name,
        type,
        pin,
        board: fromGlobalId(board).id,
        room: fromGlobalId(room).id,
        createdBy: user.id
      });
      return {
        id: boardIo._id,
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
