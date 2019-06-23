import * as React from 'react';
import {
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiBasicTable,
} from '@elastic/eui';
import { createRefetchContainer, graphql } from 'react-relay'

import { createQueryRenderer } from '../../relay/createQueryRenderer'
import BoardMenu from './BoardMenu';

  const BoardList = (props) => {
  const columns = [
    {
      field: 'name',
      name: 'Nome',
    },
    {
      field: 'type',
      name: 'Tipo',
    },
    {
      name: 'Porta/Host',
      render: ({ port, host }) => {
        if (port) return port;
        if (host) return host;
        return '-';
      }
    },
    {
      field: 'host',
      name: 'Host',
    }
  ]
  const { boards } = props.query;
  return (
    <EuiPageBody>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Dispositivos</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>
          <BoardMenu query={props.query} />
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiBasicTable
          items={boards.edges.map(({ node }) => node)}
          columns={columns}
          // pagination={{
          //   pageIndex: 1,
          //   pageSize: 20,
          //   totalItemCount: 30,
          //   pageSizeOptions: [3, 5, 8],
          //   showPerPageOptions: true,
          // }}
          // onChange={(props) => console.log(props)}
        />
      </EuiPageContent>
    </EuiPageBody>
  )
}

const fragment = createRefetchContainer(
  BoardList,
  {
    query: graphql`
      fragment BoardList_query on Query
      @argumentDefinitions(
        first: { type: Int }
        last: { type: Int }
        before: { type: String }
        after: { type: String }
        search: { type: String }
      ) {
        boards(first: $first, last: $last, after: $after, before: $before, search: $search)
        @connection(key: "BoardList_boards", filters: []){
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
              port
              host
            }
          }
        }
      }
    `
  },
  graphql`
    query BoardListRefetchQuery (
    $after: String
    $before: String
    $search: String
    $first: Int
    $last: Int
    ){
      ...BoardList_query
      @arguments(first: $first, last: $last, after: $after, before: $before, search: $search)
    }
  `
)

export default createQueryRenderer(fragment, {
  query: graphql`
    query BoardListQuery(
    $after: String
    $before: String
    $search: String
    $first: Int
    $last: Int
    ) {
      ...BoardList_query
      @arguments(first: $first, last: $last, after: $after, before: $before, search: $search)
    }
  `,
  variables: {
    first: 1000,
    cursor: null,
    search: '',
  },
})

