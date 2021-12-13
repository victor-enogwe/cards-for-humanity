import { gql } from '../../utils/gql';

export const SET_FULL_WIDTH_MUTATION = gql`
  mutation Set($input: SetFullWidthMutationInput!) {
    setFullWidth(input: $input) @client {
      fullWidth @client
    }
  }
`;

export const TOGGLE_NAV_MUTATION = gql`
  mutation ToggleNav {
    toggleNav @client {
      navOpen @client
    }
  }
`;
