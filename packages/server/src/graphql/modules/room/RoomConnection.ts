import RoomType from './RoomType';

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

export default connectionDefinitions({
  name: 'Room',
  nodeType: RoomType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
