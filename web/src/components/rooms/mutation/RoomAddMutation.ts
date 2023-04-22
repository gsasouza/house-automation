import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '../../../relay/environment';


const mutation = graphql`
    mutation RoomAddMutation($input: AddRoomInput!) {
        AddRoom(input: $input){
            error
            roomEdge {
                node {
                    id
                    name
                    type
                }
            }
        }
    }
`;

function commit({ name, type }, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        type
      },
    },
    onCompleted,
    onError,
    updater: store => {
      const rootField = store.getRootField('AddRoom');
      const newEdge = rootField.getLinkedRecord('roomEdge');
      const proxy = store.get('client:root');
      const connection = ConnectionHandler.getConnection(proxy, 'RoomList_rooms');
      ConnectionHandler.insertEdgeBefore(connection, newEdge);
    }
  });
}

export default { commit };
