import {GraphQLBoolean, GraphQLObjectType, GraphQLString} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../../schema/NodeInterface';

import * as UserLoader from '../user/UserLoader';
import UserType from '../user/UserType'
import * as RoomLoader from '../room/RoomLoader'
import BoardType from '../board/BoardType'
import * as BoardLoader from '../board/BoardLoader'


const BoardIoType: GraphQLObjectType = new GraphQLObjectType({
  name: 'BoardIo',
  description: 'BoardIo data',
  fields: () => ({
    id: globalIdField('BoardIo'),
    _id: {
      type: GraphQLString,
      resolve: boardIo => boardIo._id,
    },
    name: {
      type: GraphQLString,
      resolve: boardIo => boardIo.name,
    },
    type: {
      type: GraphQLString,
      resolve: boardIo => boardIo.type,
    },
    board: {
      type: BoardType,
      resolve: (boardIo, _, context) => BoardLoader.load(context, boardIo.board),
    },
    pin: {
      type: GraphQLString,
      resolve: boardIo => boardIo.pin,
    },
    state: {
      type: GraphQLBoolean,
      resolve: boardIo => boardIo.state,
    },
    connected: {
      type: GraphQLBoolean,
      resolve: async (boardIo, _, context) => {
        const board = await BoardLoader.load(context, boardIo.board);
        console.log('type', board);
        return board.connected;
      },
    },
    room: {
      type: BoardIoType,
      resolve: (boardIo, _, context) => RoomLoader.load(context, boardIo.room),
    },
    createdBy: {
      type: UserType,
      resolve: (boardIo, _, ctx) => UserLoader.load(ctx, boardIo.createdBy),
    },

  }),
  interfaces: () => [NodeInterface],
});

export default BoardIoType;
