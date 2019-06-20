import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../../interface/NodeInterface';

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: GraphQLString,
      resolve: user => user._id,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    isAdmin: {
      type: GraphQLBoolean,
      resolve: user => user.isAdmin,
    },
    username: {
      type: GraphQLString,
      resolve: user => user.username,
    },
  }),
  interfaces: () => [NodeInterface],
});

export default UserType;
