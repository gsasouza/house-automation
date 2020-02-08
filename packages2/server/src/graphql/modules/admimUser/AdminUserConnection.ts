import AdminUserType from './AdminUserType';

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

export default connectionDefinitions({
  name: 'AdminUser',
  nodeType: AdminUserType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
