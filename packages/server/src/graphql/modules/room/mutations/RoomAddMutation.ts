import { Room } from '@housejs/shared';

import RoomConnection from '../RoomConnection';
import * as RoomLoader from '../RoomLoader';

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'RoomAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, type }, context) => {
    const { user } = context;
    const room = await Room.findOne({ name });

    if (!user) {
      return {
        id: null,
        error: 'UNAUTHENTICATED_USER',
      };
    }

    if (room) {
      return {
        id: null,
        error: 'ROOM_ALREADY_EXISTS',
      };
    }

    try {
      const room = await Room.create({ name, type, createdBy: user.id });
      return {
        id: room._id,
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
    roomEdge: {
      type: RoomConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const room = await RoomLoader.load(context, id);
        if (!room) return null;
        return {
          cursor: toGlobalId('Room', room.id),
          node: room,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
