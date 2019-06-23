import { graphql, commitMutation } from 'react-relay';
import environment from '../../../relay/environment';

const mutation = graphql`
  mutation BoardAddMutation($input: AddBoardInput!) {
    AddBoard(input: $input){
      error
      boardEdge {
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
`;

function commit({ name, type, port, host }, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        host,
        port,
        type
      },
    },
    onCompleted,
    onError,
    configs: [{
      type: 'RANGE_ADD',
      parentID: 'client:root',
      connectionInfo: [{
        key: 'BoardList_boards',
        rangeBehavior: 'prepend',
      }],
      edgeName: 'boardEdge',
    }],
  });
}

export default { commit };
