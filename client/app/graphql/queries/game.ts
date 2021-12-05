import { gql } from '../../utils/gql';
import { GAME_NODE_FRAGMENT, NEW_GAME_NODE_FRAGMENT } from '../fragments';

export const NEW_GAME_QUERY = gql`
  ${NEW_GAME_NODE_FRAGMENT}

  query NewGame($id: ID) {
    newGame(id: $id) @client {
      ...NewGameNode
    }
  }
`;

export const GAME_IN_PROGRESS = gql`
  ${GAME_NODE_FRAGMENT}
  query GameInProgress {
    gameInProgress {
      ...GameNode
    }
  }
`;
