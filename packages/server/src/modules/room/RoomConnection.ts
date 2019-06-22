import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import RoomType from './RoomType';

export default connectionDefinitions({
  name: 'Room',
  nodeType: RoomType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
