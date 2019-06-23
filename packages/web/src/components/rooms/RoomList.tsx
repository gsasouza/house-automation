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

import BoardIoChangedSubscription from './subscriptions/BoardIoChangedSubscription';
import RoomCard from './RoomCard';
import { createQueryRenderer } from '../../relay/createQueryRenderer'
import RoomMenu from './RoomMenu';

const RoomList = (props) => {
  React.useEffect(() => {
    BoardIoChangedSubscription();
  }, [])
  const [ isDetailOpen, setDetailOpen ] = React.useState('');
  const isOpen = (id: string) => isDetailOpen === id;

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
          {rooms.edges.map(({ node }) => (
            <RoomCard
              key={node.id}
              room={node}
              isDetailOpen={isOpen(node.id)}
              handleOpenDetail={() => setDetailOpen(node.id)}
              handleCloseDetail={() => setDetailOpen('')}
            />
          ))}
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
            id
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

