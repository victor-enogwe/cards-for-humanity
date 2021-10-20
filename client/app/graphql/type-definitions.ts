import { gql } from 'apollo-angular'

export const typeDefinitions = gql`
  extend type Query {
    updateGenre(
      id: Float!,
      description: String,
      credit: String
      selected: Boolean
    ): [Launch]
  }

  extend type Mutation {
    updateGenre(
      id: Float!,
      description: String,
      credit: String
      selected: Boolean
    ): [Launch]
  }
`
