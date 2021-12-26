import { gql } from '../../utils/gql';
import { GAME_NODE_FRAGMENT } from '../fragments/game';

export const NOTIFICATIONS_SUBSCRIPTION = gql`
  ${GAME_NODE_FRAGMENT}

  subscription Notifications {
    notifications {
      __typename
      invites {
        createdAt
        game {
          ...GameNode
        }
      }
    }
  }
`;
