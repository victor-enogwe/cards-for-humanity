import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AllGenre, Genre, TIncomingRelay } from 'client/app/@types/global';
import { GENRES_QUERY, GENRE_NODE_FRAGMENT } from 'client/app/graphql';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private apollo: Apollo) {}

  fetchGenres(variables: AllGenre) {
    return this.apollo.watchQuery<{ genres: TIncomingRelay<Genre> }>({
      query: GENRES_QUERY,
      variables,
      fetchPolicy: 'cache-and-network',
    });
  }

  updateGenre(variables: Partial<Genre> & { id: number }) {
    return this.apollo.client.cache.writeFragment({
      id: `GenreNode:${variables.id}`,
      fragment: GENRE_NODE_FRAGMENT,
      data: variables,
    });
  }
}
