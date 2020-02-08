import { graphql } from 'react-relay';

export const UserLoginMutation = graphql`
  mutation UserLoginMutation($input: UserLoginInput!) {
    UserLogin(input: $input) {
      token
      error
    }
  }
`;
