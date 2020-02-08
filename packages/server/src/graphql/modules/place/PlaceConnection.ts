import PlaceType from './PlaceType';

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

export default connectionDefinitions({
  name: 'Place',
  nodeType: PlaceType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
