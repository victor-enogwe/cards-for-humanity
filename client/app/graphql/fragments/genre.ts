import { gql } from '../../utils/gql';

export const GENRE_NODE_FRAGMENT = gql`
  fragment GenreNode on GenreNode {
    id
    description
    credit
    selected @client
    blackcardSet(first: 100) {
      edges {
        node {
          id
          rating
          text
          pick
          genre {
            description
            credit
          }
        }
      }
      totalCount
      edgeCount
    }
    whitecardSet(first: 100) {
      edges {
        node {
          id
          rating
          text
          genre {
            description
            credit
          }
        }
      }
      totalCount
      edgeCount
    }
  }
`;
