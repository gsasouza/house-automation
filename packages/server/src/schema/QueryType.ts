import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { NodeField } from '../interface/NodeInterface';

import UserConnection from '../modules/user/UserConnection';
import * as UserLoader from '../modules/user/UserLoader';
import RoomConnection from '../modules/room/RoomConnection'
import * as RoomLoader from '../modules/room/RoomLoader'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => UserLoader.loadUsers(context, args),
    },
    rooms: {
      type: RoomConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => RoomLoader.loadRooms(context, args),
    },
  })
});
