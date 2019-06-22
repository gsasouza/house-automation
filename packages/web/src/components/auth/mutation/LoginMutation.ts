import { graphql, commitMutation } from 'react-relay';
import environment from '../../../relay/environment';

const mutation = graphql`
  mutation LoginMutation($input: LoginInput!) {
    Login(input: $input){
      token
      error
    }
  }
`;

function commit({ username, password }, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        username,
        password
      },
    },
    onCompleted,
    onError,
  });
}

export default { commit };
