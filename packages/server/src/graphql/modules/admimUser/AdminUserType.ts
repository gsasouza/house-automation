import { NodeInterface } from '../../interface/NodeInterface';

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

const AdminUserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'AdminUser',
  description: 'Admin User data',
  fields: () => ({
    id: globalIdField('AdminUser'),
    _id: {
      type: GraphQLString,
      resolve: user => user._id,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    username: {
      type: GraphQLString,
      resolve: user => user.username,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.username,
    },
  }),
  interfaces: () => [NodeInterface],
});

export default AdminUserType;
