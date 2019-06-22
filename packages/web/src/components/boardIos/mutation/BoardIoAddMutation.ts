import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '../../../relay/environment';


const mutation = graphql`
  mutation BoardIoAddMutation($input: AddBoardIoInput!) {
    AddBoardIo(input: $input){
      error
      boardIoEdge {
        node {
          id
          name
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
`;

function commit({ name, board, room, pin, type }, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        board,
        pin,
        room,
        type
      },
    },
    onCompleted,
    onError,
    updater: store => {
      const rootField = store.getRootField('AddBoardIo');
      const newEdge = rootField.getLinkedRecord('boardIoEdge');
      const proxy = store.get('client:root');
      const connection = ConnectionHandler.getConnection(proxy, 'BoardIoList_boardIos');
      ConnectionHandler.insertEdgeBefore(connection, newEdge);
    }
  });
}

export default { commit };
