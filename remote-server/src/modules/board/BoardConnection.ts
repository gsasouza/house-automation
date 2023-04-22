import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import BoardType from './BoardType';

export default connectionDefinitions({
  name: 'Board',
  nodeType: BoardType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
