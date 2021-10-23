import { gql } from 'client/app/utils/gql';
import { GENRE_NODE_FRAGMENT } from './genre';
import { PAGE_INFO_FRAGMENT } from './page-info';

export const GAME_NODE_FRAGMENT = gql`
  ${PAGE_INFO_FRAGMENT}
  ${GENRE_NODE_FRAGMENT}

  fragment GameNode on GameNode {
    id
    genres(first: 10) {
      edges {
        node {
          ...GenreNode
        }
        cursor
      }
    }
    roundTime
    rounds
    numPlayers
    numSpectators
    status
    createdAt
    updatedAt
    playerSet(first: 10) {
      edges {
        node {
          ...PlayerNode
        }
        cursor
      }
    }
  }
`;
