import { gql } from '../../utils/gql';

export const FULL_WIDTH_QUERY = gql`
  query FullWidth {
    fullWidth @client
  }
`;
