import { gql } from 'apollo-angular'
import { GENRE_FIELDS_FRAGMENT } from '../queries/genre'

export const GENRE_UPDATE = gql`
  ${GENRE_FIELDS_FRAGMENT}

  mutation UpdateGenre(
    $id: Float!,
    $description: String,
    $credit: String
    $selected: Boolean
  ) {
    updateGenre @client(
      id: $id,
      description: $description,
      credit: $credit,
      selected: $selected
    ) {
      ...GenreFields
    }
  }
`
