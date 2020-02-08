import AdminUserMutations from '../modules/admimUser/mutations';
import BoardMutations from '../modules/board/mutations';
import DeviceMutations from '../modules/device/mutations';
import RoomMutations from '../modules/room/mutations';
import UserMutations from '../modules/user/mutations';

import { GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...RoomMutations,
    ...BoardMutations,
    ...DeviceMutations,
    ...AdminUserMutations,
  }),
});
