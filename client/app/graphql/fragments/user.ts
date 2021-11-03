import { gql } from '../../utils/gql';

export const USER_NODE_FRAGMENT = gql`
  fragment UserNode on UserNode {
    id
    username
    firstName
    lastName
  }
`;
