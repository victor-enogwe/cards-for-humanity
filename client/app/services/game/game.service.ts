import { Injectable } from '@angular/core'
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/internal/operators/map'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  document = gql`
    subscription {
      gameSubscription(channelId: "5e2bb0415e8b616ea6eb17d7" action: CREATE operation: SUBSCRIBE) {
        stream
        error
        operation
        ok
        action
        __typename
      }
    }
  `

  constructor(private apollo: Apollo) { }

  selectGameGenre(keyword?: string) {
    const search = keyword ? `description_Icontains: ${keyword}` : ''
    return this.apollo.query({
      query: gql`
        query {
          allGenres(first: 10, ${search}) {
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
      `,
    }).pipe(map(response => response.data['allGenres'])).toPromise()
  }
}
