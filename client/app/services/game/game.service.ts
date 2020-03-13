import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { allGenres } from 'client/app/graphql/queries'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private apollo: Apollo) { }

  selectGameGenre(search = '') {
    return this.apollo.watchQuery({
      query: allGenres,
      variables: { first: 10, search },
    })
  }
}
