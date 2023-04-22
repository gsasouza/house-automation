import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { Board } from '../BoardModel';
import BoardConnection from '../BoardConnection'
import * as BoardLoader from '../BoardLoader'
import { EVENTS, publish } from "../../../pubsub/pubSub";

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
  mutateAndGetPayload: async ({ name, type, port, host }, context) => {
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

      await publish(user, {
        event: EVENTS.BOARD_IO.CHANGED, id: board._id, type,
        port,
        host,
      })

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
