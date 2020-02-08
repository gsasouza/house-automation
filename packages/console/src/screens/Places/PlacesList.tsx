import { ContentHeader, RoundedButton, Card, Table } from '@housejs/ui';

import * as React from 'react';
import { graphql } from 'react-relay';

const query = graphql`
  query PlacesListQuery
    @argumentDefinitions(
      first: { type: Int }
      last: { type: Int }
      before: { type: String }
      after: { type: String }
      search: { type: String }
    ) {
    places {
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

const tableColumns = [
  {
    header: { label: 'Nome' },
    property: 'name',
  },
  {
    header: { label: 'Referência' },
    property: 'reference',
  },
];

const PlacesList = () => {
  return (
    <>
      <ContentHeader title="Locais">
        <RoundedButton color="accent">Adicionar Local</RoundedButton>
      </ContentHeader>
      <Card>
        <Table columns={tableColumns} />
      </Card>
    </>
  );
};

export default PlacesList;
