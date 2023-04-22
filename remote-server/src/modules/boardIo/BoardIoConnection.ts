import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import BoardIoType from './BoardIoType';

export default connectionDefinitions({
  name: 'BoardIo',
  nodeType: BoardIoType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
