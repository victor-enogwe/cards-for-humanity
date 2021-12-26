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

export const INVITED_GAME_QUERY = gql`
  ${GAME_NODE_FRAGMENT}
  query Game($input: InvitedGameInput!) {
    invitedGame(input: $input) {
      ...GameNode
    }
  }
`;

export const GAME_IN_PROGRESS_QUERY = gql`
  ${GAME_NODE_FRAGMENT}
  query GameInProgress {
    gameInProgress {
      ...GameNode
    }
  }
`;
