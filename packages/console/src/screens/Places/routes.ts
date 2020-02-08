import * as React from 'react';
import { LoadingScreenContent } from '@housejs/ui';
import { prepareQuery } from '../../relay';

const routes = [
  {
    path: path => `${path}/places`,
    component: React.lazy(() => import('./PlacesList')),
    loadingComponent: LoadingScreenContent,
    prepare: () => {
      const query = require('./__generated__/PlacesListQuery.graphql');
      const variables = {
        first: 10,
        after: null,
        search: '',
      };
      return prepareQuery(query, variables);
    },
  },
];

export default routes;
