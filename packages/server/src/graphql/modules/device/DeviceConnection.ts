import DeviceType from './DeviceType';

import { GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

export default connectionDefinitions({
  name: 'Device',
  nodeType: DeviceType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
