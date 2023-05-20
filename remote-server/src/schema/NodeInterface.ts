import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import UserType from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import RoomType from '../modules/room/RoomType'
import * as RoomLoader from '../modules/room/RoomLoader'
import BoardType from '../modules/board/BoardType'
import * as BoardLoader from '../modules/board/BoardLoader'
import BoardIoType from '../modules/boardIo/BoardIoType'
import * as BoardIoLoader from '../modules/boardIo/BoardIoLoader'


const { nodeField, nodeInterface } = nodeDefinitions(
  async (globalId, context) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === 'User') {
      return await UserLoader.load(context, id);
    }
    if (type === 'Room') {
      return await RoomLoader.load(context, id);
    }
    if (type === 'Board') {
      return await BoardLoader.load(context, id);
    }
    if (type === 'BoardIo') {
      console.log('heere')
      return await BoardIoLoader.load(context, id);
    }
  },
  obj => {
    if (obj instanceof UserLoader.default) {
      return UserType;
    }
    if (obj instanceof BoardLoader.default) {
      return BoardType;
    }
    if (obj instanceof BoardIoLoader.default) {
      return BoardIoType;
    }
    if (obj instanceof RoomLoader.default) {
      return RoomType;
    }
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
