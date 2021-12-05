import { gql } from '../../utils/gql';
import { GENRE_NODE_FRAGMENT } from './genre';

export const GAME_NODE_FRAGMENT = gql`
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
    joinEndsAt
    creator {
      id
    }
    createdAt
    updatedAt
    playerSet(first: 20) {
      edges {
        node {
          id
          czar
          spectator
          avatar
          score
          user {
            id
          }
        }
        cursor
      }
    }
  }
`;

export const NEW_GAME_NODE_FRAGMENT = gql`
  fragment NewGameNode on NewGameNode {
    roundTime @client
    rounds @client
    numPlayers @client
    numSpectators @client
    joinEndsAt @client
    status @client
    genres @client
    avatar @client
  }
`;
