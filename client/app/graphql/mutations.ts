import gql from 'graphql-tag'
import { CREATE_USER_SUCCESS, CREATE_USER_FAIL_EMAIL_EXISTS, CREATE_USER_FAIL_OTHERS } from './fragments'

export const SOCIAL_AUTH = gql`
  mutation ($input: SocialAuthJWTInput!){
    socialAuth(input: $input) {
      token
    }
  }
`
export const tokenAuth = gql`
  mutation tokenAuth($user:  ObtainJSONWebTokenInput!) {
    tokenAuth(input: $user) {
      token
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation refreshToken($input: RefreshInput!) {
    refreshToken(input: $input) {
      token
    }
  }
`
export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    # createUser (email: $email, password: $password) {
    #   ...${CREATE_USER_SUCCESS}
    #   ...${CREATE_USER_FAIL_EMAIL_EXISTS}
    #   ...${CREATE_USER_FAIL_OTHERS}
    # }
  }
`
