import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import RoomMutations from '../modules/room/mutations';
import BoardMutations from '../modules/board/mutations';
import BoardIoMutations from '../modules/boardIo/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...RoomMutations,
    ...BoardMutations,
    ...BoardIoMutations,
  })
});
