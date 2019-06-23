import {GraphQLBoolean, GraphQLObjectType, GraphQLString} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../../schema/NodeInterface';

import * as UserLoader from '../user/UserLoader';
import UserType from '../user/UserType'

const BoardType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Board',
  description: 'Board data',
  fields: () => ({
    id: globalIdField('Board'),
    _id: {
      type: GraphQLString,
      resolve: board => board._id,
    },
    name: {
      type: GraphQLString,
      resolve: board => board.name,
    },
    type: {
      type: GraphQLString,
      resolve: board => board.type,
    },
    host: {
      type: GraphQLString,
      resolve: board => board.host,
    },
    port: {
      type: GraphQLString,
      resolve: board => board.port,
    },
    connected: {
      type: GraphQLBoolean,
      resolve: board => board.connected
    },
    createdBy: {
      type: UserType,
      resolve: (board, _, ctx) => UserLoader.load(ctx, board.createdBy),
    },

  }),
  interfaces: () => [NodeInterface],
});

export default BoardType;
