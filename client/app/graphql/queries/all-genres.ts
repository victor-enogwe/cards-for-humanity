import { gql } from 'apollo-angular'
import { GENRE_FIELDS_FRAGMENT } from './genre'
import { PAGE_INFO_FIELDS_FRAGMENT } from './page-info'

export const ALL_GENRES = gql`
  ${PAGE_INFO_FIELDS_FRAGMENT}

  ${GENRE_FIELDS_FRAGMENT}

  query AllGenres(
    $id: Float,
    $id_Lt: Float,
    $id_Gt: Float,
    $description: String,
    $description_Icontains: String,
    $description_Istartswith: String,
    $credit: String,
    $credit_Icontains: String,
    $credit_Istartswith: String,
    $before: String,
    $after: String,
    $offset: Int,
    $first: Int,
    $last: Int,
  ) {
    allGenres(
      id: $id,
      id_Lt: $id_Lt,
      id_Gt: $id_Gt,
      description: $description,
      description_Icontains: $description_Icontains,
      description_Istartswith: $description_Istartswith,
      credit: $credit,
      credit_Icontains: $credit_Icontains,
      credit_Istartswith: $credit_Istartswith,
      before: $before,
      after: $after,
      offset: $offset,
      first: $first,
      last: $last,
    ) {
      totalCount
      pageInfo {
        ...PageInfoFields
      }
      edges {
        node {
          ...GenreFields
        }
      }
    }
  }
`
