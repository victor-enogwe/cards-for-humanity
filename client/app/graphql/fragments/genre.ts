import { gql } from 'client/app/utils/gql'

export const GENRE_NODE_FRAGMENT = gql`
  fragment GenreNode on GenreNode {
    id
    description
    credit
    selected @client
  }
`
