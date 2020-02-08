import UserType from './UserType';

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

export default connectionDefinitions({
  name: 'User',
  nodeType: UserType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
