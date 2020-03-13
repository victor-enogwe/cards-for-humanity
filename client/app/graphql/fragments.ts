import gql from 'graphql-tag'

export const CREATE_USER_SUCCESS = gql`
  fragment CreateUserSuccess on CreateUserSuccess {
    token
  }
`
