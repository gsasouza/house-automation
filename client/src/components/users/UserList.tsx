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
// import UserMenu from './UserMenu';

const UserList = (props) => {
  const columns = [
    {
      field: 'name',
      name: 'Nome',
    },
    {
      field: 'username',
      name: 'Usuário',
    },
  ]
  const { users } = props.query;
  return (
    <EuiPageBody>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Usuários</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>
          {/*<UserMenu query={props.query} />*/}
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiBasicTable
          items={users.edges.map(({ node }) => node)}
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
  UserList,
  {
    query: graphql`
      fragment UserList_query on Query
      @argumentDefinitions(
        first: { type: Int }
        last: { type: Int }
        before: { type: String }
        after: { type: String }
        search: { type: String }
      ) {
        users(first: $first, last: $last, after: $after, before: $before, search: $search)
        @connection(key: "UserList_users", filters: []){
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
              name
              username
            }
          }
        }
      }
    `
  },
  graphql`
    query UserListRefetchQuery (
    $after: String
    $before: String
    $search: String
    $first: Int
    $last: Int
    ){
      ...UserList_query
      @arguments(first: $first, last: $last, after: $after, before: $before, search: $search)
    }
  `
)

export default createQueryRenderer(fragment, {
  query: graphql`
    query UserListQuery(
    $after: String
    $before: String
    $search: String
    $first: Int
    $last: Int
    ) {
      ...UserList_query
      @arguments(first: $first, last: $last, after: $after, before: $before, search: $search)
    }
  `,
  variables: {
    first: 1000,
    cursor: null,
    search: '',
  },
})

