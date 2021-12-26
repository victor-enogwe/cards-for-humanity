import { Injectable } from '@angular/core';
import { FetchPolicy, WatchQueryFetchPolicy } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { map, share } from 'rxjs';
import {
  BatchCreateInviteInput,
  BlackCardNodeEdge,
  CreateGameInput,
  CreateGameMutationInput,
  GameNode,
  InvitedGameInput,
  JoinGameMutationInput,
  Maybe,
  Mutation,
  Query,
  Scalars,
  UpdateGamePrivacyInput,
  UpdateGameStatusInput,
  UserNode,
  WhiteCardNodeEdge,
} from '../../@types/graphql';
import {
  CREATE_GAME_LOCAL_MUTATION,
  CREATE_GAME_MUTATION,
  GAME_IN_PROGRESS_QUERY,
  GAME_IN_PROGRESS_SUBSCRIPTION,
  INVITED_GAME_QUERY,
  INVITE_GAME_PLAYERS_MUTATION,
  JOIN_GAME_MUTATION,
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

  isCreator(game?: Maybe<GameNode>): boolean {
    const userId = this.authService.profile$.getValue()?.sub;
    return userId === game?.creator.id;
  }

  isPlayer(game?: Maybe<GameNode>): boolean {
    const userId = this.authService.profile$.getValue()?.sub;
    const userPlayer = game?.playerSet?.edges?.filter((player) => player?.node?.user.id === userId);
    return Boolean(userPlayer?.length);
  }

  cardDeck(game?: Maybe<GameNode>): { blackcardSet: Maybe<BlackCardNodeEdge>[]; whitecardSet: Maybe<WhiteCardNodeEdge>[] } {
    let blackcardSet: Maybe<BlackCardNodeEdge>[] = [];
    let whitecardSet: Maybe<WhiteCardNodeEdge>[] = [];
    game?.genres.edges.forEach((edge) => {
      blackcardSet = blackcardSet.concat(edge?.node?.blackcardSet.edges!);
      whitecardSet = whitecardSet.concat(edge?.node?.whitecardSet.edges!);
    });

    return { whitecardSet, blackcardSet };
  }

  fetchGameOptions(variables: { id: Scalars['ID'] }) {
    return this.apollo.watchQuery<Pick<Query, 'newGame'>>({
      query: NEW_GAME_QUERY,
      variables,
      fetchPolicy: 'cache-only',
    });
  }

  fetchInvitedGame(input: InvitedGameInput) {
    return this.apollo.query<Pick<Query, 'invitedGame'>>({ query: INVITED_GAME_QUERY, variables: { input } }).pipe(share());
  }

  fetchGameInProgress(fetchPolicy?: FetchPolicy) {
    return this.apollo.query<Pick<Query, 'gameInProgress'>>({ query: GAME_IN_PROGRESS_QUERY, fetchPolicy }).pipe(share());
  }

  watchGameInProgress(fetchPolicy?: WatchQueryFetchPolicy) {
    return this.apollo.watchQuery<Pick<Query, 'gameInProgress'>>({ query: GAME_IN_PROGRESS_QUERY });
  }

  createNewGame(game: CreateGameMutationInput) {
    return this.apollo.mutate<Pick<Mutation, 'createNewGame'>, { input: CreateGameMutationInput }>({
      mutation: CREATE_GAME_LOCAL_MUTATION,
      variables: { input: game },
      optimisticResponse: {
        createNewGame: {
          __typename: 'CreateNewGameMutation',
          newGame: {
            __typename: 'NewGameNode',
            id: '1',
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
            inviteSet: { __typename: 'InviteNodeConnection', edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            status: 'AWAITING_PLAYERS',
            private: false,
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
      update: (cache, { data }) =>
        cache.writeQuery<Pick<Query, 'gameInProgress'>>({
          query: GAME_IN_PROGRESS_QUERY,
          data: { gameInProgress: data?.createGame?.game },
        }),
    });
  }

  invitePlayers(input: BatchCreateInviteInput[]) {
    return this.apollo.mutate<Pick<Mutation, 'gameInvitation'>>({
      mutation: INVITE_GAME_PLAYERS_MUTATION,
      variables: { input },
    });
  }

  updateGameStatus(id: Scalars['ID'], input: UpdateGameStatusInput) {
    return this.apollo.mutate<Pick<Mutation, 'gameStatus'>, { id: Scalars['ID']; input: UpdateGameStatusInput }>({
      mutation: UPDATE_GAME_STATUS_MUTATION,
      variables: { id, input },
      refetchQueries: [{ query: GAME_IN_PROGRESS_QUERY }],
    });
  }

  updateGamePrivacy(id: Scalars['ID'], input: UpdateGamePrivacyInput) {
    return this.apollo.mutate<Pick<Mutation, 'gamePrivacy'>, { id: Scalars['ID']; input: UpdateGamePrivacyInput }>({
      mutation: UPDATE_GAME_PRIVACY_MUTATION,
      variables: { id, input },
    });
  }

  joinGame(input: JoinGameMutationInput) {
    return this.apollo.mutate<Pick<Mutation, 'joinGame'>>({
      mutation: JOIN_GAME_MUTATION,
      variables: { input },
    });
  }

  gameInProgressSubscription(callback?: (game: GameNode) => any) {
    return this.watchGameInProgress().subscribeToMore({
      document: GAME_IN_PROGRESS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { gameInProgress } = subscriptionData.data;
        if (!gameInProgress) return prev;
        const update: { gameInProgress: GameNode } = {
          gameInProgress: {
            ...prev.gameInProgress,
            ...gameInProgress.gameInProgress,
          },
        };

        if (callback) callback(update.gameInProgress);
        return update;
      },
    });
  }

  resolveNewGame() {
    return this.fetchGameOptions({ id: '1' }).valueChanges.pipe(
      share(),
      map(({ data }) => data.newGame),
    );
  }
}
