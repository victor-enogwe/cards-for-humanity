import { gql } from 'client/app/utils/gql';
import { GAME_NODE_FRAGMENT } from './game';
import { USER_NODE_FRAGMENT } from './user';

export const PLAYER_NODE_FRAGMENT = gql`
  ${GAME_NODE_FRAGMENT}
  ${USER_NODE_FRAGMENT}

  fragment PlayerNode on PlayerNode {
    id
    game {
      id
      roundTime
      rounds
      numPlayers
      numSpectators
      status
      createdAt
      updatedAt
    }
    user {
      ...UserNode
    }
    score
    czar
    createdAt
    updatedAt
  }
`;
