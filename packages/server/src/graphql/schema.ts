import MutationType from './type/MutationType';
import QueryType from './type/QueryType';
import SubscriptionType from './type/SubscriptionType';

import { GraphQLSchema } from 'graphql';

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
});

export default schema;
