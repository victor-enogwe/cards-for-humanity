import { gql } from '../../utils/gql';
import { NEW_GAME_NODE_FRAGMENT } from '../fragments';

export const NEW_GAME_QUERY = gql`
  ${NEW_GAME_NODE_FRAGMENT}

  query NewGame($id: Float) {
    newGame(id: $id) @client {
      ...NewGameNode
    }
  }
`;
