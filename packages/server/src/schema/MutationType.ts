import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import RoomMutations from '../modules/room/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...RoomMutations
  })
});
