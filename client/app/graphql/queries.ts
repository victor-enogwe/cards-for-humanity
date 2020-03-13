import gql from 'graphql-tag'

export const tokenAuth = gql`
  query tokenAuth {
    tokenAuth @client {
      token
    }
  }
`

export const User = gql`
  query User {
    User @client {
      provider
      id
      email
      name
      photoUrl
      firstName
      lastName
      authToken
    }
  }
`

export const allGenres = gql`
  query ($first: Int, $search: String) {
    allGenres(first: $first, description_Icontains: $search) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          Id
          description
        }
      }
    }
  }
`
