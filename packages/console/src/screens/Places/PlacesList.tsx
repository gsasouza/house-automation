import { ContentHeader, RoundedButton, Card, Table } from '@housejs/ui';

import * as React from 'react';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay/hooks';

const tableColumns = [
  {
    header: { label: 'Referência' },
    property: 'reference',
  },
  {
    header: { label: 'Nome' },
    property: 'name',
  },
];

const PlacesList = ({ preloadedQuery }) => {
  const query = usePreloadedQuery(PlacesListQuery, preloadedQuery);
  const { data } = usePaginationFragment(fragment, query);
  return (
    <>
      <ContentHeader title="Locais">
        <RoundedButton color="accent">Adicionar Local</RoundedButton>
      </ContentHeader>
      <Card>
        <Table columns={tableColumns} data={data.places} />
      </Card>
    </>
  );
};

const fragment = graphql`
  fragment PlacesList_places on Query
    @argumentDefinitions(first: { type: Int }, after: { type: String }, search: { type: String })
    @refetchable(queryName: "PlacesListPaginationQuery") {
    places(first: $first, after: $after, search: $search) @connection(key: "PlacesList_places", filters: ["search"]) {
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          name
          reference
        }
      }
    }
  }
`;

const PlacesListQuery = graphql`
  query PlacesListQuery($first: Int, $after: String, $search: String) {
    ...PlacesList_places @arguments(first: $first, after: $after, search: $search)
  }
`;

export default PlacesList;
