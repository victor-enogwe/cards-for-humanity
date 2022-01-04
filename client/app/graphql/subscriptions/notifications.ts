import { GAME_NODE_FRAGMENT } from '..';
import { gql } from '../../utils/gql';

export const NOTIFICATIONS_SUBSCRIPTION = gql`
  ${GAME_NODE_FRAGMENT}

  subscription Notifications($email: String!) {
    notifications {
      notifications {
        id
        __typename
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
  }
`;
