import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId, toGlobalId, fromGlobalId } from 'graphql-relay';
import { BoardIo } from '../BoardIOModel';
import BoardIoConnection from '../BoardIoConnection'
import * as BoardIoLoader from '../BoardIoLoader'
import { EVENTS, publish } from "../../../pubsub/pubSub";

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
        error: 'BOARD_IO_ALREADY_EXISTS',
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

      await publish(user, { event: EVENTS.BOARD_IO.CHANGED, id: boardIo._id, type, pin, board  })

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
