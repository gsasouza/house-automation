import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../../schema/NodeInterface';

import * as UserLoader from '../user/UserLoader';
import UserType from '../user/UserType'

const RoomType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Room',
  description: 'Room data',
  fields: () => ({
    id: globalIdField('Room'),
    _id: {
      type: GraphQLString,
      resolve: room => room._id,
    },
    name: {
      type: GraphQLString,
      resolve: room => room.name,
    },
    type: {
      type: GraphQLString,
      resolve: room => room.type,
    },
    createdBy: {
      type: UserType,
      resolve: (room, _, ctx) => UserLoader.load(ctx, room.createdBy),
    },

  }),
  interfaces: () => [NodeInterface],
});

export default RoomType;
