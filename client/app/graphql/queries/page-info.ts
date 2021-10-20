import { gql } from 'apollo-angular'

export const PAGE_INFO_FIELDS_FRAGMENT = gql`
  fragment PageInfoFields on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`
