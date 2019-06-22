import * as React from 'react';
import {
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup
} from '@elastic/eui';
import { createFragmentContainer, graphql } from 'react-relay'

import RoomCard from './RoomCard';
import { createQueryRenderer } from '../../relay/createQueryRenderer'
import RoomMenu from './RoomMenu';

const RoomList = (props) => {
  const { rooms } = props.query;
  return (
    <EuiPageBody>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Cômodos</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>
          <RoomMenu />
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiFlexGroup gutterSize="l" wrap>
          {rooms.edges.map(({ node }) => <RoomCard key={node.id} room={node}/>)}
        </EuiFlexGroup>
      </EuiPageContent>
    </EuiPageBody>
  )
}

const fragment = createFragmentContainer(RoomList, {
  query: graphql`
    fragment RoomList_query on Query {
      rooms (first: 100)
        @connection(key: "RoomList_rooms") {
        count
        edges {
          node {
            ...RoomCard_room
          }
        }
      }
    }
  `
})

export default createQueryRenderer(fragment, {
  query: graphql`
    query RoomListQuery {
      ...RoomList_query
    }
  `
})

