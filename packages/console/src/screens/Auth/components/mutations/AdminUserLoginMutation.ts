import { graphql } from 'react-relay';

export const AdminUserLoginMutation = graphql`
  mutation AdminUserLoginMutation($input: AdminUserLoginInput!) {
    AdminUserLogin(input: $input) {
      token
      error
    }
  }
`;
