import gql from 'graphql-tag'
import { CREATE_USER_SUCCESS } from './fragments'

export const socialAuth = gql`
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

export const refreshToken = gql`
  mutation refreshToken($input: RefreshInput!) {
    refreshToken(input: $input) {
      token
    }
  }
`
export const createUser = gql`
  ${CREATE_USER_SUCCESS}
  mutation createUser($email: String!, $password: String!) {
    createUser (email: $email, password: $password) {
      ...CreateUserSuccess
    }
  }
`
