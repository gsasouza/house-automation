import DeviceSubscriptions from '../modules/device/subscriptions';

import { GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...DeviceSubscriptions,
  },
});
