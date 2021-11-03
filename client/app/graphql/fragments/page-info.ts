import { gql } from '../../utils/gql';

export const PAGE_INFO_FRAGMENT = gql`
  fragment PageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;
