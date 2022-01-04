import { gql } from '../../utils/gql';
import { PAGE_INFO_FRAGMENT } from './page-info';

export const INVITE_NODE_FRAGMENT = gql`
  fragment InviteNode on InviteNode {
    id
    spectator
    revoked
    game {
      ...GameNode
    }
  }
`;

export const INVITES_FRAGMENT = gql`
  ${PAGE_INFO_FRAGMENT}
  ${INVITE_NODE_FRAGMENT}

  fragment InviteNodeConnection on InviteNodeConnection {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...InviteNode
      }
    }
  }
`;
