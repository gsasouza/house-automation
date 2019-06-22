import * as React from 'react';
import {
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup
} from '@elastic/eui';
import { createRefetchContainer, graphql } from 'react-relay'

import {
  EuiBasicTable,
} from '@elastic/eui';

import { createQueryRenderer } from '../../relay/createQueryRenderer'
import BoardIoMenu from './BoardIoMenu';

const BoardIoList = (props) => {
  const columns = [
    {
      field: 'name',
      name: 'Nome',
    },
    {
      field: 'room.name',
      name: 'Cômodo',
    },
    {
      field: 'board.name',
      name: 'Placa',
    },
    {
      field: 'type',
      name: 'Tipo',
    },
    {
      field: 'pin',
      name: 'Pino',
    }
  ]
  const { boardIos } = props.query;
  console.log(boardIos);
  return (
    <EuiPageBody>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Dispositivos</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>
          <BoardIoMenu query={props.query} />
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiBasicTable
          items={boardIos.edges.map(({ node }) => node)}
          columns={columns}
          pagination={{
            pageIndex: 1,
            pageSize: 20,
            totalItemCount: 30,
            pageSizeOptions: [3, 5, 8],
            showPerPageOptions: true,
          }}
          onChange={(props) => console.log(props)}
        />
      </EuiPageContent>
    </EuiPageBody>
  )
}

const fragment = createRefetchContainer(
  BoardIoList,
  {
    query: graphql`
      fragment BoardIoList_query on Query
      @argumentDefinitions(
        first: { type: Int }
        last: { type: Int }
        before: { type: String }
        after: { type: String }
        search: { type: String }
      ) {
        ...BoardIoMenu_query
        boardIos(first: $first, last: $last, after: $after, before: $before, search: $search)
        @connection(key: "BoardIoList_boardIos") {
          count
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              name
              type
              pin
              board {
                name
              }
              room {
                name
              }
            }
          }
        }
      }
    `
  },
  graphql`
    query BoardIoListRefetchQuery (
      $after: String
      $before: String
      $search: String
      $first: Int
      $last: Int
    ){
      ...BoardIoList_query 
        @arguments(first: $first, last: $last, after: $after, before: $before, search: $search)
    }
  `
)

export default createQueryRenderer(fragment, {
  query: graphql`
    query BoardIoListQuery(
      $after: String
      $before: String
      $search: String
      $first: Int
      $last: Int
    ) {
      ...BoardIoList_query
        @arguments(first: $first, last: $last, after: $after, before: $before, search: $search)
    }
  `,
  variables: {
    first: 10,
    cursor: null,
    search: '',
  },
})

