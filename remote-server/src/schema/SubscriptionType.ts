import { GraphQLObjectType } from 'graphql';

import BoardIoSubscriptions from '../modules/boardIo/subscriptions';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...BoardIoSubscriptions,
  },
});
