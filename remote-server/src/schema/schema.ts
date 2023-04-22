import { GraphQLSchema } from 'graphql';
import { } from 'graphql-tools';

import QueryType from './QueryType';
import MutationType from './MutationType';
import SubscriptionType from './SubscriptionType';

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
});
