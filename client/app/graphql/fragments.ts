import gql from 'graphql-tag'

export const CREATE_USER_SUCCESS = gql`
  fragment CreateUserSuccess on CreateUserSuccess {
    token
  }
`

export const CREATE_USER_FAIL_EMAIL_EXISTS = gql`
  fragment CreateUserFailEmailExists on CreateUserFailEmailExists {
    errorMessage
  }
`

export const CREATE_USER_FAIL_OTHERS = gql`
  fragment CreateUserFailOthers on CreateUserFailOthers {
    errorMessage
  }
`
