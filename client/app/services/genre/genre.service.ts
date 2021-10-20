import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { AllGenre, Genre, TIncomingRelay } from 'client/app/@types/global'
import { ALL_GENRES, GENRE_FIELDS_FRAGMENT } from 'client/app/graphql'

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(private apollo: Apollo) { }

  fetchGenres(variables: AllGenre) {
    return this.apollo.watchQuery<{ allGenres: TIncomingRelay<Genre> }>({
      query: ALL_GENRES,
      variables,
      fetchPolicy: 'cache-and-network'
    })
  }

  updateGenre(variables: Partial<Genre> & { id: number }) {
    return this.apollo.client.cache.writeFragment({
      id: `GenreNode:${variables.id}`,
      fragment: GENRE_FIELDS_FRAGMENT,
      data: variables
    })
    // return this.apollo.mutate({
    //   mutation: GENRE_UPDATE,
    //   variables,
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     updateGenre: {
    //       __typename: 'GenreNode',
    //       ...variables
    //     },
    //   }
    // })
  }
}
