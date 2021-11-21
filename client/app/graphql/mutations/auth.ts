import { gql } from '../../utils/gql';

export const LOGIN_MANUAL_MUTATION = gql`
  mutation TokenAuth($input: ObtainJSONWebTokenMutationInput!) {
    tokenAuth(input: $input) {
      token
      payload {
        username
        sub
        subName
        exp
      }
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