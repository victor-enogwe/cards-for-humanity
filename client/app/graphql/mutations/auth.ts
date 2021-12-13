import { gql } from '../../utils/gql';

export const LOGIN_SOCIAL_MUTATION = gql`
  mutation SocialAuth($input: SocialAuthJWTInput!) {
    socialAuth(input: $input) {
      token
      social {
        id
        provider
      }
    }
  }
`;

export const LOGIN_MANUAL_MUTATION = gql`
  mutation TokenAuth($input: ObtainJSONWebTokenMutationInput!) {
    tokenAuth(input: $input) {
      token
      payload {
        username
        sub
        name
        exp
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($input: RefreshTokenMutationInput!) {
    refreshToken(input: $input) {
      token
      payload {
        username
        sub
        name
        exp
      }
    }
  }
`;

export const REVOKE_REFRESH_TOKEN = gql`
  mutation RevokeRefreshToken($input: RevokeInput!) {
    revokeRefreshToken(input: $input) {
      revoked
    }
  }
`;

export const DELETE_REFRESH_TOKEN_COOKIE = gql`
  mutation DeleteRefreshToken($input: DeleteRefreshTokenCookieInput!) {
    deleteRefreshTokenCookie(input: $input) {
      deleted
    }
  }
`;
