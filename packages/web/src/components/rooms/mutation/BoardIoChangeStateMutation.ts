import { graphql, commitMutation } from 'react-relay';
import environment from '../../../relay/environment';


const mutation = graphql`
  mutation BoardIoChangeStateMutation($input: BoardIoChangeStateInput!) {
    BoardIoChangeState(input: $input){
      error
      boardIoEdge {
        node {
          id
          state
        }
      }
    }
  }
`;

function commit({ id, state }, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id,
        state,
      },
    },
    onCompleted,
    onError,
    optimisticResponse: {
      BoardIoChangeState: {
        error: null,
        boardIoEdge: {
          node: { id, state }
        }
      }
    }
  });
}

export default { commit };
