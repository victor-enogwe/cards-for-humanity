import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { first, map, Observable, switchMap } from 'rxjs';
import { CreateGameMutationInput, NewGameNode } from '../../@types/graphql';
import { CREATE_GAME_LOCAL_MUTATION, CREATE_GAME_MUTATION, NEW_GAME_QUERY } from '../../graphql';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private apollo: Apollo, private authService: AuthService) {}

  fetchGameOptions(variables: { id: string }) {
    return this.apollo.watchQuery<{ newGame: NewGameNode }>({
      query: NEW_GAME_QUERY,
      variables,
      fetchPolicy: 'cache-only',
    });
  }

  createNewGame(game: CreateGameMutationInput) {
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

  createGame(game: CreateGameMutationInput) {
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

  resolve(): Observable<NewGameNode> {
    return this.authService.username$.pipe(
      switchMap((username) =>
        this.fetchGameOptions({ id: username! }).valueChanges.pipe(
          first(),
          map(({ data }) => ({ ...data.newGame, id: username })),
        ),
      ),
    );
  }
}
