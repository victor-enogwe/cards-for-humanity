import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AllGenre, TIncomingRelay } from '../../@types/global';
import { GenreNode } from '../../@types/graphql';
import { GENRES_QUERY, GENRE_NODE_FRAGMENT } from '../../graphql';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private apollo: Apollo) {}

  fetchGenres(variables: AllGenre) {
    return this.apollo.watchQuery<{ genres: TIncomingRelay<GenreNode> }>({
      query: GENRES_QUERY,
      variables,
      fetchPolicy: 'cache-first',
    });
  }

  updateGenre(genre: Partial<GenreNode>) {
    return this.apollo.client.cache.writeFragment({
      id: `GenreNode:${genre.id}`,
      fragment: GENRE_NODE_FRAGMENT,
      data: genre,
    });
  }
}
