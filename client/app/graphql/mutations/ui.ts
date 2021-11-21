import { gql } from '../../utils/gql';

export const SET_FULL_WIDTH_MUTATION = gql`
  mutation SetFullWidth($input: SetFullWidthMutationInput!) {
    setFullWidth(input: $input) @client {
      fullWidth @client
    }
  }
`;
