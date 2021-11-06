import { gql } from '../../utils/gql';
import { USER_NODE_FRAGMENT } from '../fragments';

export const LOGIN_MANUAL_MUTATION = gql`
  mutation TokenAuth($input: ObtainJSONWebTokenInput!) {
    tokenAuth(input: $input) {
      token
      payload
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($input: RefreshInput!) {
    refreshToken(input: $input) {
      token
      payload
    }
  }
`;

export const SAVE_PROFILE_MUTATION = gql`
  ${USER_NODE_FRAGMENT}

  mutation SaveProfile($input: SaveProfileInput!) {
    saveProfile(input: $input) @client {
      profile @client {
        ...UserNode
      }
    }
  }
`;
