import { gql } from '../../utils/gql';

export const WHITE_CARD_NODE_FRAGMENT = gql`
  fragment WhiteCardNode on WhiteCardNode {
    id
    rating
    text
    genre {
      description
      credit
    }
  }
`;

export const BLACK_CARD_NODE_FRAGMENT = gql`
  fragment BlackCardNode on BlackCardNode {
    id
    rating
    text
    pick
    genre {
      description
      credit
    }
  }
`;
