import { gql } from '../../utils/gql';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserMutationInput!) {
    createUser(input: $input) {
      ok
    }
  }
`;
