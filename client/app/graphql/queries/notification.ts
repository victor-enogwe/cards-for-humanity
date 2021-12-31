import { gql } from '../../utils/gql';
import { GAME_NODE_FRAGMENT } from '../fragments';

export const NOTIFICATIONS_QUERY = gql`
  ${GAME_NODE_FRAGMENT}

  query Notifications($email: String!) {
    notifications {
      id
      invites(first: 10, email: $email, revoked: false) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            id
            spectator
            revoked
            game {
              ...GameNode
            }
          }
        }
      }
    }
  }
`;
