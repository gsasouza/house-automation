import { Place } from '@housejs/shared';

import PlaceConnection from '../PlaceConnection';
import * as PlaceLoader from '../PlaceLoader';

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { USER_TYPES } from '../../../../common/auth';

export default mutationWithClientMutationId({
  name: 'PlaceAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    reference: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, reference }, context) => {
    const { user } = context;
    const place = await Place.findOne({ reference });

    if (!user) {
      return {
        id: null,
        error: 'UNAUTHENTICATED_USER',
      };
    }

    if (user.type !== USER_TYPES.ADMIN_USER) {
      return {
        id: null,
        error: 'UNAUTHORIZED_USER',
      };
    }

    if (place) {
      return {
        id: null,
        error: 'PLACE_ALREADY_EXISTS',
      };
    }

    try {
      const place = await Place.create({ name, reference });
      return {
        id: place._id,
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
    placeEdge: {
      type: PlaceConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const place = await PlaceLoader.load(context, id);
        if (!place) return null;
        return {
          cursor: toGlobalId('Place', place.id),
          node: place,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
