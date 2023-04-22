import { graphql, commitMutation } from 'react-relay';
import environment from '../../../relay/environment';


const mutation = graphql`
  mutation BoardIoAddMutation($input: AddBoardIoInput!) {
    AddBoardIo(input: $input){
      error
      boardIoEdge {
        node {
          id
          name
          pin
          type
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
    configs: [{
      type: 'RANGE_ADD',
      parentID: 'client:root',
      connectionInfo: [{
        key: 'BoardIoList_boardIos',
        rangeBehavior: 'prepend',
      }],
      edgeName: 'boardIoEdge',
    }],
  });
}

export default { commit };
