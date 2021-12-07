import { gql } from '../../utils/gql';
import { GAME_NODE_FRAGMENT } from '../fragments/game';

export const GAME_IN_PROGRESS_SUBSCRIPTION = gql`
  ${GAME_NODE_FRAGMENT}

  subscription GameInProgress {
    gameInProgress {
      __typename
      gameInProgress {
        ...GameNode
      }
    }
  }
`;
