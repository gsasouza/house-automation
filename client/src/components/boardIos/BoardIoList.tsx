import * as React from 'react';
import {
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiBasicTable,
  EuiHealth,
} from '@elastic/eui';
import { createRefetchContainer, graphql } from 'react-relay'

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
    },
    {
      field: 'connected',
      name: 'Conectado',
      dataType: 'boolean',
      render: connected => {
        const color = connected ? 'success' : 'danger';
        const label = connected ? 'Conectado' : 'Desconectado';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
  ]
  const { boardIos } = props.query;
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
        boardIos(first: $first, last: $last, after: $after, before: $before, search: $search)
          @connection(key: "BoardIoList_boardIos", filters: []){
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
              connected
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
        ...BoardIoMenu_query
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
    first: 1000,
    cursor: null,
    search: '',
  },
})

