import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Game } from 'client/app/@types/global'
import { CREATE_GAME_MUTATION } from 'client/app/graphql'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apollo: Apollo) { }

  createGameCache(game: Omit<Game, 'status'>) {
    // return this.apollo.client.writeQuery({
    //   query: CREATE_GAME_LOCAL_MUTATION,
    //   variables: game
    // })
  }

  createGame(game: Omit<Game, 'status'>) {
    return this.apollo.mutate({
      mutation: CREATE_GAME_MUTATION,
      variables: game,
      optimisticResponse: {
        __typename: 'Mutation',
        ...game
      }
    })
  }
}
