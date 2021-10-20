import { gql } from 'apollo-angular'

export const GENRE_FIELDS_FRAGMENT = gql`
  fragment GenreFields on GenreNode {
    id
    description
    credit
    selected @client
  }
`
