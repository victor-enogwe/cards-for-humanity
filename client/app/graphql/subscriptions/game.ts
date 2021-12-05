import { gql } from '../../utils/gql';
import { GAME_NODE_FRAGMENT } from '../fragments/game';

export const GAME_SUBSCRIPTION = gql`
  ${GAME_NODE_FRAGMENT}

  subscription Game($id: ID!) {
    game(id: $id) {
      __typename
      room
      game {
        ...GameNode
      }
    }
  }
`;
