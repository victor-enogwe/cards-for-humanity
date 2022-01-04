import { gql } from '../../utils/gql';
import { INVITE_NODE_FRAGMENT } from './invites';

export const NOTIFICATIONS_FRAGMENT = gql`
  ${INVITE_NODE_FRAGMENT}

  fragment NotificationNode on NotificationNode {
    id
    invites(first: 10, email: $email, revoked: false) {
      ...InviteNodeConnection
    }
  }
`;
