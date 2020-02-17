import BoardType from './BoardType';

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

export default connectionDefinitions({
  name: 'Board',
  nodeType: BoardType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
