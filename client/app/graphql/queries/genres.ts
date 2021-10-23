import { gql } from 'client/app/utils/gql';
import { GENRE_NODE_FRAGMENT, PAGE_INFO_FRAGMENT } from '../fragments';

export const GENRES_QUERY = gql`
  ${PAGE_INFO_FRAGMENT}

  ${GENRE_NODE_FRAGMENT}

  query Genres(
    $id: Float
    $id_Lt: Float
    $id_Gt: Float
    $description: String
    $description_Icontains: String
    $description_Istartswith: String
    $credit: String
    $credit_Icontains: String
    $credit_Istartswith: String
    $offset: Int
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    genres(
      id: $id
      id_Lt: $id_Lt
      id_Gt: $id_Gt
      description: $description
      description_Icontains: $description_Icontains
      description_Istartswith: $description_Istartswith
      credit: $credit
      credit_Icontains: $credit_Icontains
      credit_Istartswith: $credit_Istartswith
      before: $before
      after: $after
      offset: $offset
      first: $first
      last: $last
    ) {
      totalCount
      edgeCount
      pageInfo {
        ...PageInfo
      }
      edges {
        node {
          ...GenreNode
        }
        cursor
      }
    }
  }
`;
