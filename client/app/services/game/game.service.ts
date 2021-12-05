import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CreateGameInput,
  CreateGameMutationInput,
  GameNode,
  Mutation,
  NewGameNode,
  Query,
  Scalars,
  Subscription,
  UpdateGamePrivacyInput,
  UpdateGameStatusInput,
  UserNode,
} from '../../@types/graphql';
import {
  CREATE_GAME_LOCAL_MUTATION,
  CREATE_GAME_MUTATION,
  GAME_IN_PROGRESS,
  GAME_SUBSCRIPTION,
  NEW_GAME_QUERY,
  UPDATE_GAME_PRIVACY_MUTATION,
  UPDATE_GAME_STATUS_MUTATION,
} from '../../graphql';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private apollo: Apollo, private authService: AuthService) {}

  fetchGameOptions(variables: { id: Scalars['ID'] }) {
    return this.apollo.watchQuery<{ newGame: NewGameNode }>({
      query: NEW_GAME_QUERY,
      variables,
      fetchPolicy: 'cache-only',
    });
  }

  fetchGameInProgress() {
    return this.apollo.query<Pick<Query, 'gameInProgress'>>({ query: GAME_IN_PROGRESS, fetchPolicy: 'network-only' });
  }

  createNewGame(game: Partial<CreateGameMutationInput>) {
    return this.apollo.mutate<Pick<Mutation, 'createNewGame'>, { input: Partial<CreateGameMutationInput> & { id: Scalars['ID'] } }>({
      mutation: CREATE_GAME_LOCAL_MUTATION,
      variables: { input: { id: 'newGame', ...game } },
      optimisticResponse: {
        createNewGame: {
          __typename: 'CreateNewGameMutation',
          newGame: {
            __typename: 'NewGameNode',
            id: 'newGame',
            avatar: game.avatar!,
            genres: game.genres!,
            joinEndsAt: game.joinEndsAt!,
            numPlayers: game.numPlayers!,
            numSpectators: game.numSpectators!,
            roundTime: game.roundTime!,
            rounds: game.rounds!,
            status: game.status!,
            ...game,
          },
        },
      },
    });
  }

  createGame(game: CreateGameInput) {
    const { sub } = this.authService.profile$.getValue()!;
    return this.apollo.mutate<Pick<Mutation, 'createGame'>, { input: CreateGameInput }>({
      mutation: CREATE_GAME_MUTATION,
      variables: { input: game },
      optimisticResponse: {
        createGame: {
          __typename: 'CreateGameMutation',
          game: {
            __typename: 'GameNode',
            id: 'optimistic',
            joinEndsAt: game.joinEndsAt!,
            createdAt: new Date(),
            updatedAt: new Date(),
            playerSet: { __typename: 'PlayerNodeConnection', edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            status: 'AWAITING_PLAYERS',
            creator: {
              __typename: 'UserNode',
              createdAt: new Date(),
              updatedAt: new Date(),
              id: String(sub!),
            } as UserNode,
            ...game,
            genres: { __typename: 'GenreNodeConnection', edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
          } as GameNode,
        },
      },
    });
  }

  updateGameStatus(id: Scalars['ID'], input: UpdateGameStatusInput) {
    return this.apollo.mutate<Pick<Mutation, 'gameStatus'>, { id: Scalars['ID']; input: UpdateGameStatusInput }>({
      mutation: UPDATE_GAME_STATUS_MUTATION,
      variables: { id, input },
      optimisticResponse: {
        gameStatus: {
          __typename: 'GameStatusMutation',
          game: { __typename: 'GameNode', id, ...input } as GameNode,
        },
      },
    });
  }

  updateGamePrivacy(id: Scalars['ID'], input: UpdateGamePrivacyInput) {
    return this.apollo.mutate<Pick<Mutation, 'gamePrivacy'>, { id: Scalars['ID']; input: UpdateGamePrivacyInput }>({
      mutation: UPDATE_GAME_PRIVACY_MUTATION,
      variables: { id, input },
      optimisticResponse: {
        gamePrivacy: {
          __typename: 'GamePrivacyMutation',
          game: { __typename: 'GameNode', id, ...input } as GameNode,
        },
      },
    });
  }

  subscription(id: Scalars['ID']) {
    return this.apollo.subscribe<Pick<Subscription, 'game'>, { id: Scalars['ID'] }>({
      query: GAME_SUBSCRIPTION,
      variables: { id },
    });
  }

  resolve(): Observable<NewGameNode> {
    return this.fetchGameOptions({ id: 'newGame' }).valueChanges.pipe(map(({ data }) => ({ ...data.newGame, id: 'newGame' })));
  }
}
