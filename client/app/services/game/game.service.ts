import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { TIncomingRelay } from '../../@types/global';
import { CreateGameInput, NewGameNode } from '../../@types/graphql';
import { CREATE_GAME_LOCAL_MUTATION, CREATE_GAME_MUTATION, NEW_GAME_QUERY } from '../../graphql';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private apollo: Apollo) {}

  fetchGameOptions(variables: { id: number }) {
    return this.apollo.watchQuery<{ newGame: TIncomingRelay<NewGameNode> }>({
      query: NEW_GAME_QUERY,
      variables,
      fetchPolicy: 'cache-only',
    });
  }

  createNewGame(game: CreateGameInput) {
    return this.apollo.mutate({
      mutation: CREATE_GAME_LOCAL_MUTATION,
      variables: { input: game },
      optimisticResponse: {
        __typename: 'Mutation',
        createNewGame: {
          __typename: 'CreateNewGameMutation',
          ...game,
        },
      },
    });
  }

  createGame(game: CreateGameInput) {
    return this.apollo.mutate({
      mutation: CREATE_GAME_MUTATION,
      variables: { input: game },
      optimisticResponse: {
        __typename: 'Mutation',
        createGame: {
          __typename: 'CreateGameMutation',
          game: { ...game },
        },
      },
    });
  }
}
