import { NodeInterface } from '../../interface/NodeInterface';

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

const PlaceType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Place',
  description: 'Place data',
  fields: () => ({
    id: globalIdField('Place'),
    _id: {
      type: GraphQLString,
      resolve: place => place._id,
    },
    name: {
      type: GraphQLString,
      resolve: place => place.name,
    },
    reference: {
      type: GraphQLString,
      resolve: place => place.reference,
    },
  }),
  interfaces: () => [NodeInterface],
});

export default PlaceType;
