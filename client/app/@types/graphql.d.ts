import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  SocialCamelJSON: any;
}

/** An enumeration. */
export type ApiBlackCardPickChoices =
  /** pick1 */
  | 'A_1'
  /** pick2 */
  | 'A_2';

/** An enumeration. */
export type ApiBlackCardRatingChoices =
  /** Normal */
  | 'NORMAL';

/** An enumeration. */
export type ApiGameStatusChoices =
  /** Gaa */
  | 'AWAITING_ANSWERS'
  /** Gac */
  | 'AWAITING_CZAR'
  /** Gap */
  | 'AWAITING_PLAYERS'
  /** Gc */
  | 'GAME_CANCELED'
  /** Ge */
  | 'GAME_ENDED'
  /** Gs */
  | 'GAME_STARTED';

/** An enumeration. */
export type ApiPlayerAvatarChoices =
  /** Abby */
  | 'ABBY'
  /** Alfred */
  | 'ALFRED'
  /** Andina */
  | 'ANDINA'
  /** Astro */
  | 'ASTRO'
  /** Camile */
  | 'CAMILE'
  /** Dorothy */
  | 'DOROTHY'
  /** Dudai */
  | 'DUDAI'
  /** Eduardo */
  | 'EDUARDO'
  /** General */
  | 'GENERAL'
  /** Grace */
  | 'GRACE'
  /** Iranir */
  | 'IRANIR'
  /** Jennifer */
  | 'JENNIFER'
  /** Labrat */
  | 'LABRAT'
  /** Luther */
  | 'LUTHER'
  /** Rainbowness */
  | 'RAINBOWNESS'
  /** Shin */
  | 'SHIN';

/** An enumeration. */
export type ApiWhiteCardRatingChoices =
  /** Normal */
  | 'NORMAL';

export interface BlackCardNode extends Node {
  readonly __typename?: 'BlackCardNode';
  readonly createdAt: Scalars['DateTime'];
  readonly genre: GenreNode;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  readonly pick: ApiBlackCardPickChoices;
  readonly rating: ApiBlackCardRatingChoices;
  /** text allows 2-255 characters(alphabets and -,_,.,',",space) */
  readonly text: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
}

export interface BlackCardNodeConnection {
  readonly __typename?: 'BlackCardNodeConnection';
  readonly edgeCount?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  readonly edges: ReadonlyArray<Maybe<BlackCardNodeEdge>>;
  /** Pagination data for this connection. */
  readonly pageInfo: PageInfo;
  readonly totalCount?: Maybe<Scalars['Int']>;
}

/** A Relay edge containing a `BlackCardNode` and its cursor. */
export interface BlackCardNodeEdge {
  readonly __typename?: 'BlackCardNodeEdge';
  /** A cursor for use in pagination */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge */
  readonly node?: Maybe<BlackCardNode>;
}

export interface ConnectSubscription {
  readonly __typename?: 'ConnectSubscription';
  readonly message?: Maybe<Scalars['String']>;
  readonly ok?: Maybe<Scalars['Boolean']>;
  readonly room?: Maybe<Scalars['ID']>;
}

export interface CreateGameInput {
  readonly genres: ReadonlyArray<InputMaybe<Scalars['ID']>>;
  readonly inviteSet?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  /** seconds */
  readonly joinEndsAt?: InputMaybe<Scalars['DateTime']>;
  /** no of players */
  readonly numPlayers?: InputMaybe<Scalars['Int']>;
  /** no of spectators */
  readonly numSpectators?: InputMaybe<Scalars['Int']>;
  readonly playerSetAdd?: InputMaybe<ReadonlyArray<InputMaybe<CreateGameInputAddGamePlayerset>>>;
  readonly private?: InputMaybe<Scalars['Boolean']>;
  /** seconds */
  readonly roundTime?: InputMaybe<Scalars['Int']>;
  /** no of game rounds */
  readonly rounds?: InputMaybe<Scalars['Int']>;
}

export interface CreateGameInputAddGamePlayerset {
  readonly avatar?: InputMaybe<ApiPlayerAvatarChoices>;
  readonly spectator?: InputMaybe<Scalars['Boolean']>;
  readonly user: Scalars['ID'];
  readonly winner?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
}

export interface CreateGameMutation {
  readonly __typename?: 'CreateGameMutation';
  readonly game?: Maybe<GameNode>;
}

export interface CreateGameMutationInput {
  readonly avatar: ApiPlayerAvatarChoices;
  readonly genres: ReadonlyArray<InputMaybe<Scalars['ID']>>;
  readonly joinEndsAt: Scalars['DateTime'];
  readonly numPlayers: Scalars['Int'];
  readonly numSpectators: Scalars['Int'];
  readonly roundTime: Scalars['Int'];
  readonly rounds: Scalars['Int'];
  readonly status: Scalars['String'];
}

export interface CreateNewGameMutation {
  readonly __typename?: 'CreateNewGameMutation';
  readonly newGame?: Maybe<NewGameNode>;
}

export interface CreateUserMutation {
  readonly __typename?: 'CreateUserMutation';
  readonly ok?: Maybe<Scalars['Boolean']>;
}

export interface CreateUserMutationInput {
  readonly email: Scalars['String'];
  readonly password: Scalars['String'];
}

export interface DeleteRefreshTokenCookieInput {
  readonly clientMutationId?: InputMaybe<Scalars['String']>;
}

export interface DeleteRefreshTokenCookiePayload {
  readonly __typename?: 'DeleteRefreshTokenCookiePayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly deleted: Scalars['Boolean'];
}

export interface GameInProgressSubscription {
  readonly __typename?: 'GameInProgressSubscription';
  readonly gameInProgress?: Maybe<GameNode>;
}

export interface GameNode extends Node {
  readonly __typename?: 'GameNode';
  readonly createdAt: Scalars['DateTime'];
  readonly creator: UserNode;
  readonly genres: GenreNodeConnection;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  /** seconds */
  readonly joinEndsAt: Scalars['DateTime'];
  /** no of players */
  readonly numPlayers: Scalars['Int'];
  /** no of spectators */
  readonly numSpectators: Scalars['Int'];
  readonly playerSet: PlayerNodeConnection;
  readonly private: Scalars['Boolean'];
  /** seconds */
  readonly roundTime: Scalars['Int'];
  /** no of game rounds */
  readonly rounds: Scalars['Int'];
  readonly status: ApiGameStatusChoices;
  readonly updatedAt: Scalars['DateTime'];
  readonly winner?: Maybe<PlayerNode>;
}


export interface GameNodeGenresArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  credit?: InputMaybe<Scalars['String']>;
  credit_Icontains?: InputMaybe<Scalars['String']>;
  credit_Istartswith?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_Icontains?: InputMaybe<Scalars['String']>;
  description_Istartswith?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Float']>;
  id_Gt?: InputMaybe<Scalars['Float']>;
  id_Lt?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}


export interface GameNodePlayerSetArgs {
  after?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  czar?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  game?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['Int']>;
  spectator?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<Scalars['ID']>;
}

export interface GameNodeConnection {
  readonly __typename?: 'GameNodeConnection';
  readonly edgeCount?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  readonly edges: ReadonlyArray<Maybe<GameNodeEdge>>;
  /** Pagination data for this connection. */
  readonly pageInfo: PageInfo;
  readonly totalCount?: Maybe<Scalars['Int']>;
}

/** A Relay edge containing a `GameNode` and its cursor. */
export interface GameNodeEdge {
  readonly __typename?: 'GameNodeEdge';
  /** A cursor for use in pagination */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge */
  readonly node?: Maybe<GameNode>;
}

export interface GamePrivacyMutation {
  readonly __typename?: 'GamePrivacyMutation';
  readonly game?: Maybe<GameNode>;
}

export interface GameStatusMutation {
  readonly __typename?: 'GameStatusMutation';
  readonly game?: Maybe<GameNode>;
}

export interface GenreNode extends Node {
  readonly __typename?: 'GenreNode';
  readonly blackcardSet: BlackCardNodeConnection;
  /** credit creator(url) */
  readonly credit?: Maybe<Scalars['String']>;
  /** description allows 2-255 characters(alphabets and -,_,.,',",space) */
  readonly description: Scalars['String'];
  readonly gameSet: GameNodeConnection;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  readonly selected?: Maybe<Scalars['Boolean']>;
  readonly whitecardSet: WhiteCardNodeConnection;
}


export interface GenreNodeBlackcardSetArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  first?: InputMaybe<Scalars['Int']>;
  genre?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  pick?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
}


export interface GenreNodeGameSetArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  genres?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  joinEndsAt?: InputMaybe<Scalars['DateTime']>;
  last?: InputMaybe<Scalars['Int']>;
  numPlayers?: InputMaybe<Scalars['Int']>;
  numSpectators?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  roundTime?: InputMaybe<Scalars['Int']>;
  rounds?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  winner?: InputMaybe<Scalars['ID']>;
}


export interface GenreNodeWhitecardSetArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  genre?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  text_Icontains?: InputMaybe<Scalars['String']>;
  text_Istartswith?: InputMaybe<Scalars['String']>;
}

export interface GenreNodeConnection {
  readonly __typename?: 'GenreNodeConnection';
  readonly edgeCount?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  readonly edges: ReadonlyArray<Maybe<GenreNodeEdge>>;
  /** Pagination data for this connection. */
  readonly pageInfo: PageInfo;
  readonly totalCount?: Maybe<Scalars['Int']>;
}

/** A Relay edge containing a `GenreNode` and its cursor. */
export interface GenreNodeEdge {
  readonly __typename?: 'GenreNodeEdge';
  /** A cursor for use in pagination */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge */
  readonly node?: Maybe<GenreNode>;
}

export interface JwtPayloadNode {
  readonly __typename?: 'JWTPayloadNode';
  readonly aud?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly emailVerified?: Maybe<Scalars['Boolean']>;
  readonly exp?: Maybe<Scalars['Int']>;
  readonly iat?: Maybe<Scalars['Int']>;
  readonly iss?: Maybe<Scalars['String']>;
  readonly jti?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly nbf?: Maybe<Scalars['Int']>;
  readonly provider?: Maybe<Scalars['String']>;
  readonly sub?: Maybe<Scalars['Int']>;
  readonly username?: Maybe<Scalars['String']>;
}

export interface JoinGameMutation {
  readonly __typename?: 'JoinGameMutation';
  readonly ok?: Maybe<Scalars['Boolean']>;
  readonly player?: Maybe<PlayerNode>;
}

export interface JoinGameMutationInput {
  readonly avatar: Scalars['String'];
  readonly game: Scalars['ID'];
  readonly spectator?: InputMaybe<Scalars['Boolean']>;
}

/** Root Mutation for the cards against humanity api. */
export interface Mutation {
  readonly __typename?: 'Mutation';
  readonly createGame?: Maybe<CreateGameMutation>;
  readonly createNewGame?: Maybe<CreateNewGameMutation>;
  readonly createUser?: Maybe<CreateUserMutation>;
  readonly deleteRefreshTokenCookie?: Maybe<DeleteRefreshTokenCookiePayload>;
  readonly gamePrivacy?: Maybe<GamePrivacyMutation>;
  readonly gameStatus?: Maybe<GameStatusMutation>;
  readonly joinGame?: Maybe<JoinGameMutation>;
  readonly refreshToken?: Maybe<RefreshTokenMutationPayload>;
  readonly revokeRefreshToken?: Maybe<RevokePayload>;
  readonly setFullWidth?: Maybe<SetFullWidthMutation>;
  /** Social Auth for JSON Web Token (JWT) */
  readonly socialAuth?: Maybe<SocialAuthJwtPayload>;
  readonly tokenAuth?: Maybe<ObtainJsonWebTokenMutationPayload>;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationCreateGameArgs {
  input: CreateGameInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationCreateNewGameArgs {
  input: CreateGameMutationInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationCreateUserArgs {
  input: CreateUserMutationInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationDeleteRefreshTokenCookieArgs {
  input: DeleteRefreshTokenCookieInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationGamePrivacyArgs {
  id: Scalars['ID'];
  input: UpdateGamePrivacyInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationGameStatusArgs {
  id: Scalars['ID'];
  input: UpdateGameStatusInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationJoinGameArgs {
  input: JoinGameMutationInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationRefreshTokenArgs {
  input: RefreshTokenMutationInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationRevokeRefreshTokenArgs {
  input: RevokeInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationSetFullWidthArgs {
  input: SetFullWidthMutationInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationSocialAuthArgs {
  input: SocialAuthJwtInput;
}


/** Root Mutation for the cards against humanity api. */
export interface MutationTokenAuthArgs {
  input: ObtainJsonWebTokenMutationInput;
}

export interface NewGameNode {
  readonly __typename?: 'NewGameNode';
  readonly avatar: ApiPlayerAvatarChoices;
  readonly genres: ReadonlyArray<Maybe<Scalars['ID']>>;
  readonly id: Scalars['ID'];
  readonly joinEndsAt: Scalars['DateTime'];
  readonly numPlayers: Scalars['Int'];
  readonly numSpectators: Scalars['Int'];
  readonly roundTime: Scalars['Int'];
  readonly rounds: Scalars['Int'];
  readonly status: Scalars['String'];
}

/** An object with an ID */
export interface Node {
  /** The ID of the object. */
  readonly id: Scalars['ID'];
}

export interface ObtainJsonWebTokenMutationInput {
  readonly clientMutationId?: InputMaybe<Scalars['String']>;
  readonly password: Scalars['String'];
  readonly username: Scalars['String'];
}

export interface ObtainJsonWebTokenMutationPayload {
  readonly __typename?: 'ObtainJSONWebTokenMutationPayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly payload?: Maybe<JwtPayloadNode>;
  readonly refreshExpiresIn: Scalars['Int'];
  readonly refreshToken: Scalars['String'];
  readonly token: Scalars['String'];
}

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export interface PageInfo {
  readonly __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  readonly hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  readonly hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor?: Maybe<Scalars['String']>;
}

export interface PlayerNode extends Node {
  readonly __typename?: 'PlayerNode';
  readonly avatar: ApiPlayerAvatarChoices;
  readonly createdAt: Scalars['DateTime'];
  readonly czar: Scalars['Boolean'];
  readonly game: GameNode;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  readonly score: Scalars['Int'];
  readonly spectator: Scalars['Boolean'];
  readonly updatedAt: Scalars['DateTime'];
  readonly user: UserNode;
  readonly winner: GameNodeConnection;
}


export interface PlayerNodeWinnerArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  genres?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  joinEndsAt?: InputMaybe<Scalars['DateTime']>;
  last?: InputMaybe<Scalars['Int']>;
  numPlayers?: InputMaybe<Scalars['Int']>;
  numSpectators?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  roundTime?: InputMaybe<Scalars['Int']>;
  rounds?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  winner?: InputMaybe<Scalars['ID']>;
}

export interface PlayerNodeConnection {
  readonly __typename?: 'PlayerNodeConnection';
  readonly edgeCount?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  readonly edges: ReadonlyArray<Maybe<PlayerNodeEdge>>;
  /** Pagination data for this connection. */
  readonly pageInfo: PageInfo;
  readonly totalCount?: Maybe<Scalars['Int']>;
}

/** A Relay edge containing a `PlayerNode` and its cursor. */
export interface PlayerNodeEdge {
  readonly __typename?: 'PlayerNodeEdge';
  /** A cursor for use in pagination */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge */
  readonly node?: Maybe<PlayerNode>;
}

/** Root Query for the cards against humanity api. */
export interface Query {
  readonly __typename?: 'Query';
  readonly blackCards?: Maybe<BlackCardNodeConnection>;
  /**
   * @client
   *  page is full width
   */
  readonly fullWidth?: Maybe<Scalars['Boolean']>;
  readonly game?: Maybe<GameNode>;
  readonly gameInProgress?: Maybe<GameNode>;
  /** find games */
  readonly games?: Maybe<GameNodeConnection>;
  /** all cards genre */
  readonly genres?: Maybe<GenreNodeConnection>;
  readonly newGame?: Maybe<NewGameNode>;
  /** find users */
  readonly users?: Maybe<UserNodeConnection>;
  readonly whiteCards?: Maybe<WhiteCardNodeConnection>;
}


/** Root Query for the cards against humanity api. */
export interface QueryBlackCardsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  first?: InputMaybe<Scalars['Int']>;
  genre?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  pick?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
}


/** Root Query for the cards against humanity api. */
export interface QueryGameArgs {
  id?: InputMaybe<Scalars['ID']>;
}


/** Root Query for the cards against humanity api. */
export interface QueryGamesArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  genres?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  joinEndsAt?: InputMaybe<Scalars['DateTime']>;
  last?: InputMaybe<Scalars['Int']>;
  numPlayers?: InputMaybe<Scalars['Int']>;
  numSpectators?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  roundTime?: InputMaybe<Scalars['Int']>;
  rounds?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  winner?: InputMaybe<Scalars['ID']>;
}


/** Root Query for the cards against humanity api. */
export interface QueryGenresArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  credit?: InputMaybe<Scalars['String']>;
  credit_Icontains?: InputMaybe<Scalars['String']>;
  credit_Istartswith?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_Icontains?: InputMaybe<Scalars['String']>;
  description_Istartswith?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Float']>;
  id_Gt?: InputMaybe<Scalars['Float']>;
  id_Lt?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}


/** Root Query for the cards against humanity api. */
export interface QueryNewGameArgs {
  id: Scalars['ID'];
}


/** Root Query for the cards against humanity api. */
export interface QueryUsersArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  first?: InputMaybe<Scalars['Int']>;
  groups?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isStaff?: InputMaybe<Scalars['Boolean']>;
  isSuperuser?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userPermissions?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
}


/** Root Query for the cards against humanity api. */
export interface QueryWhiteCardsArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  genre?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  text_Icontains?: InputMaybe<Scalars['String']>;
  text_Istartswith?: InputMaybe<Scalars['String']>;
}

export interface RefreshTokenMutationInput {
  readonly clientMutationId?: InputMaybe<Scalars['String']>;
  readonly refreshToken?: InputMaybe<Scalars['String']>;
}

export interface RefreshTokenMutationPayload {
  readonly __typename?: 'RefreshTokenMutationPayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly payload?: Maybe<JwtPayloadNode>;
  readonly refreshExpiresIn: Scalars['Int'];
  readonly refreshToken: Scalars['String'];
  readonly token: Scalars['String'];
}

export interface RevokeInput {
  readonly clientMutationId?: InputMaybe<Scalars['String']>;
  readonly refreshToken?: InputMaybe<Scalars['String']>;
}

export interface RevokePayload {
  readonly __typename?: 'RevokePayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly revoked: Scalars['Int'];
}

export interface SetFullWidthMutation {
  readonly __typename?: 'SetFullWidthMutation';
  readonly fullWidth?: Maybe<Scalars['Boolean']>;
}

export interface SetFullWidthMutationInput {
  readonly fullWidth: Scalars['Boolean'];
}

export interface SocialAuthJwtInput {
  readonly accessToken: Scalars['String'];
  readonly clientMutationId?: InputMaybe<Scalars['String']>;
  readonly provider: Scalars['String'];
}

/** Social Auth for JSON Web Token (JWT) */
export interface SocialAuthJwtPayload {
  readonly __typename?: 'SocialAuthJWTPayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly social?: Maybe<SocialNode>;
  readonly token?: Maybe<Scalars['String']>;
}

export interface SocialNode extends Node {
  readonly __typename?: 'SocialNode';
  readonly created: Scalars['DateTime'];
  readonly extraData?: Maybe<Scalars['SocialCamelJSON']>;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  readonly modified: Scalars['DateTime'];
  readonly provider: Scalars['String'];
  readonly uid: Scalars['String'];
  readonly user: UserNode;
}

export interface SocialNodeConnection {
  readonly __typename?: 'SocialNodeConnection';
  /** Contains the nodes in this connection. */
  readonly edges: ReadonlyArray<Maybe<SocialNodeEdge>>;
  /** Pagination data for this connection. */
  readonly pageInfo: PageInfo;
}

/** A Relay edge containing a `SocialNode` and its cursor. */
export interface SocialNodeEdge {
  readonly __typename?: 'SocialNodeEdge';
  /** A cursor for use in pagination */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge */
  readonly node?: Maybe<SocialNode>;
}

/** Root Subscription for the cards against humanity api. */
export interface Subscription {
  readonly __typename?: 'Subscription';
  readonly connect?: Maybe<ConnectSubscription>;
  readonly gameInProgress?: Maybe<GameInProgressSubscription>;
}


/** Root Subscription for the cards against humanity api. */
export interface SubscriptionConnectArgs {
  room: Scalars['ID'];
}

export interface UpdateGamePrivacyInput {
  readonly private: Scalars['Boolean'];
}

export interface UpdateGameStatusInput {
  readonly status: ApiGameStatusChoices;
}

export interface UserNode extends Node {
  readonly __typename?: 'UserNode';
  readonly createdAt: Scalars['DateTime'];
  readonly gameSet: GameNodeConnection;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  /** Active */
  readonly isActive: Scalars['Boolean'];
  /** Is Admin */
  readonly isAdmin: Scalars['Boolean'];
  /** Is Staff */
  readonly isStaff: Scalars['Boolean'];
  /** Is Superuser */
  readonly isSuperuser: Scalars['Boolean'];
  readonly playerSet: PlayerNodeConnection;
  readonly socialAuth: SocialNodeConnection;
  readonly updatedAt: Scalars['DateTime'];
}


export interface UserNodeGameSetArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  genres?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  joinEndsAt?: InputMaybe<Scalars['DateTime']>;
  last?: InputMaybe<Scalars['Int']>;
  numPlayers?: InputMaybe<Scalars['Int']>;
  numSpectators?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  private?: InputMaybe<Scalars['Boolean']>;
  roundTime?: InputMaybe<Scalars['Int']>;
  rounds?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  winner?: InputMaybe<Scalars['ID']>;
}


export interface UserNodePlayerSetArgs {
  after?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  czar?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  game?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  score?: InputMaybe<Scalars['Int']>;
  spectator?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<Scalars['ID']>;
}


export interface UserNodeSocialAuthArgs {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_In?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  uid?: InputMaybe<Scalars['String']>;
  uid_In?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
}

export interface UserNodeConnection {
  readonly __typename?: 'UserNodeConnection';
  readonly edgeCount?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  readonly edges: ReadonlyArray<Maybe<UserNodeEdge>>;
  /** Pagination data for this connection. */
  readonly pageInfo: PageInfo;
  readonly totalCount?: Maybe<Scalars['Int']>;
}

/** A Relay edge containing a `UserNode` and its cursor. */
export interface UserNodeEdge {
  readonly __typename?: 'UserNodeEdge';
  /** A cursor for use in pagination */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge */
  readonly node?: Maybe<UserNode>;
}

export interface WhiteCardNode extends Node {
  readonly __typename?: 'WhiteCardNode';
  readonly createdAt: Scalars['DateTime'];
  readonly genre: GenreNode;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  readonly rating: ApiWhiteCardRatingChoices;
  /** text allows 2-255 characters(alphabets and -,_,.,',",space) */
  readonly text: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
}

export interface WhiteCardNodeConnection {
  readonly __typename?: 'WhiteCardNodeConnection';
  readonly edgeCount?: Maybe<Scalars['Int']>;
  /** Contains the nodes in this connection. */
  readonly edges: ReadonlyArray<Maybe<WhiteCardNodeEdge>>;
  /** Pagination data for this connection. */
  readonly pageInfo: PageInfo;
  readonly totalCount?: Maybe<Scalars['Int']>;
}

/** A Relay edge containing a `WhiteCardNode` and its cursor. */
export interface WhiteCardNodeEdge {
  readonly __typename?: 'WhiteCardNodeEdge';
  /** A cursor for use in pagination */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge */
  readonly node?: Maybe<WhiteCardNode>;
}

export type BlackCardNodeKeySpecifier = ('createdAt' | 'genre' | 'id' | 'pick' | 'rating' | 'text' | 'updatedAt' | BlackCardNodeKeySpecifier)[];
export type BlackCardNodeFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	genre?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	pick?: FieldPolicy<any> | FieldReadFunction<any>,
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BlackCardNodeConnectionKeySpecifier = ('edgeCount' | 'edges' | 'pageInfo' | 'totalCount' | BlackCardNodeConnectionKeySpecifier)[];
export type BlackCardNodeConnectionFieldPolicy = {
	edgeCount?: FieldPolicy<any> | FieldReadFunction<any>,
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BlackCardNodeEdgeKeySpecifier = ('cursor' | 'node' | BlackCardNodeEdgeKeySpecifier)[];
export type BlackCardNodeEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConnectSubscriptionKeySpecifier = ('message' | 'ok' | 'room' | ConnectSubscriptionKeySpecifier)[];
export type ConnectSubscriptionFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	ok?: FieldPolicy<any> | FieldReadFunction<any>,
	room?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateGameMutationKeySpecifier = ('game' | CreateGameMutationKeySpecifier)[];
export type CreateGameMutationFieldPolicy = {
	game?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateNewGameMutationKeySpecifier = ('newGame' | CreateNewGameMutationKeySpecifier)[];
export type CreateNewGameMutationFieldPolicy = {
	newGame?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateUserMutationKeySpecifier = ('ok' | CreateUserMutationKeySpecifier)[];
export type CreateUserMutationFieldPolicy = {
	ok?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteRefreshTokenCookiePayloadKeySpecifier = ('clientMutationId' | 'deleted' | DeleteRefreshTokenCookiePayloadKeySpecifier)[];
export type DeleteRefreshTokenCookiePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	deleted?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GameInProgressSubscriptionKeySpecifier = ('gameInProgress' | GameInProgressSubscriptionKeySpecifier)[];
export type GameInProgressSubscriptionFieldPolicy = {
	gameInProgress?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GameNodeKeySpecifier = ('createdAt' | 'creator' | 'genres' | 'id' | 'joinEndsAt' | 'numPlayers' | 'numSpectators' | 'playerSet' | 'private' | 'roundTime' | 'rounds' | 'status' | 'updatedAt' | 'winner' | GameNodeKeySpecifier)[];
export type GameNodeFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	genres?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	joinEndsAt?: FieldPolicy<any> | FieldReadFunction<any>,
	numPlayers?: FieldPolicy<any> | FieldReadFunction<any>,
	numSpectators?: FieldPolicy<any> | FieldReadFunction<any>,
	playerSet?: FieldPolicy<any> | FieldReadFunction<any>,
	private?: FieldPolicy<any> | FieldReadFunction<any>,
	roundTime?: FieldPolicy<any> | FieldReadFunction<any>,
	rounds?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	winner?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GameNodeConnectionKeySpecifier = ('edgeCount' | 'edges' | 'pageInfo' | 'totalCount' | GameNodeConnectionKeySpecifier)[];
export type GameNodeConnectionFieldPolicy = {
	edgeCount?: FieldPolicy<any> | FieldReadFunction<any>,
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GameNodeEdgeKeySpecifier = ('cursor' | 'node' | GameNodeEdgeKeySpecifier)[];
export type GameNodeEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GamePrivacyMutationKeySpecifier = ('game' | GamePrivacyMutationKeySpecifier)[];
export type GamePrivacyMutationFieldPolicy = {
	game?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GameStatusMutationKeySpecifier = ('game' | GameStatusMutationKeySpecifier)[];
export type GameStatusMutationFieldPolicy = {
	game?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GenreNodeKeySpecifier = ('blackcardSet' | 'credit' | 'description' | 'gameSet' | 'id' | 'selected' | 'whitecardSet' | GenreNodeKeySpecifier)[];
export type GenreNodeFieldPolicy = {
	blackcardSet?: FieldPolicy<any> | FieldReadFunction<any>,
	credit?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	gameSet?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	selected?: FieldPolicy<any> | FieldReadFunction<any>,
	whitecardSet?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GenreNodeConnectionKeySpecifier = ('edgeCount' | 'edges' | 'pageInfo' | 'totalCount' | GenreNodeConnectionKeySpecifier)[];
export type GenreNodeConnectionFieldPolicy = {
	edgeCount?: FieldPolicy<any> | FieldReadFunction<any>,
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GenreNodeEdgeKeySpecifier = ('cursor' | 'node' | GenreNodeEdgeKeySpecifier)[];
export type GenreNodeEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type JWTPayloadNodeKeySpecifier = ('aud' | 'email' | 'emailVerified' | 'exp' | 'iat' | 'iss' | 'jti' | 'name' | 'nbf' | 'provider' | 'sub' | 'username' | JWTPayloadNodeKeySpecifier)[];
export type JWTPayloadNodeFieldPolicy = {
	aud?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	emailVerified?: FieldPolicy<any> | FieldReadFunction<any>,
	exp?: FieldPolicy<any> | FieldReadFunction<any>,
	iat?: FieldPolicy<any> | FieldReadFunction<any>,
	iss?: FieldPolicy<any> | FieldReadFunction<any>,
	jti?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	nbf?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>,
	sub?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type JoinGameMutationKeySpecifier = ('ok' | 'player' | JoinGameMutationKeySpecifier)[];
export type JoinGameMutationFieldPolicy = {
	ok?: FieldPolicy<any> | FieldReadFunction<any>,
	player?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createGame' | 'createNewGame' | 'createUser' | 'deleteRefreshTokenCookie' | 'gamePrivacy' | 'gameStatus' | 'joinGame' | 'refreshToken' | 'revokeRefreshToken' | 'setFullWidth' | 'socialAuth' | 'tokenAuth' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createGame?: FieldPolicy<any> | FieldReadFunction<any>,
	createNewGame?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteRefreshTokenCookie?: FieldPolicy<any> | FieldReadFunction<any>,
	gamePrivacy?: FieldPolicy<any> | FieldReadFunction<any>,
	gameStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	joinGame?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	revokeRefreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	setFullWidth?: FieldPolicy<any> | FieldReadFunction<any>,
	socialAuth?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenAuth?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NewGameNodeKeySpecifier = ('avatar' | 'genres' | 'id' | 'joinEndsAt' | 'numPlayers' | 'numSpectators' | 'roundTime' | 'rounds' | 'status' | NewGameNodeKeySpecifier)[];
export type NewGameNodeFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	genres?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	joinEndsAt?: FieldPolicy<any> | FieldReadFunction<any>,
	numPlayers?: FieldPolicy<any> | FieldReadFunction<any>,
	numSpectators?: FieldPolicy<any> | FieldReadFunction<any>,
	roundTime?: FieldPolicy<any> | FieldReadFunction<any>,
	rounds?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ObtainJSONWebTokenMutationPayloadKeySpecifier = ('clientMutationId' | 'payload' | 'refreshExpiresIn' | 'refreshToken' | 'token' | ObtainJSONWebTokenMutationPayloadKeySpecifier)[];
export type ObtainJSONWebTokenMutationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	payload?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshExpiresIn?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlayerNodeKeySpecifier = ('avatar' | 'createdAt' | 'czar' | 'game' | 'id' | 'score' | 'spectator' | 'updatedAt' | 'user' | 'winner' | PlayerNodeKeySpecifier)[];
export type PlayerNodeFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	czar?: FieldPolicy<any> | FieldReadFunction<any>,
	game?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	spectator?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	winner?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlayerNodeConnectionKeySpecifier = ('edgeCount' | 'edges' | 'pageInfo' | 'totalCount' | PlayerNodeConnectionKeySpecifier)[];
export type PlayerNodeConnectionFieldPolicy = {
	edgeCount?: FieldPolicy<any> | FieldReadFunction<any>,
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlayerNodeEdgeKeySpecifier = ('cursor' | 'node' | PlayerNodeEdgeKeySpecifier)[];
export type PlayerNodeEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('blackCards' | 'fullWidth' | 'game' | 'gameInProgress' | 'games' | 'genres' | 'newGame' | 'users' | 'whiteCards' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	blackCards?: FieldPolicy<any> | FieldReadFunction<any>,
	fullWidth?: FieldPolicy<any> | FieldReadFunction<any>,
	game?: FieldPolicy<any> | FieldReadFunction<any>,
	gameInProgress?: FieldPolicy<any> | FieldReadFunction<any>,
	games?: FieldPolicy<any> | FieldReadFunction<any>,
	genres?: FieldPolicy<any> | FieldReadFunction<any>,
	newGame?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>,
	whiteCards?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RefreshTokenMutationPayloadKeySpecifier = ('clientMutationId' | 'payload' | 'refreshExpiresIn' | 'refreshToken' | 'token' | RefreshTokenMutationPayloadKeySpecifier)[];
export type RefreshTokenMutationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	payload?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshExpiresIn?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RevokePayloadKeySpecifier = ('clientMutationId' | 'revoked' | RevokePayloadKeySpecifier)[];
export type RevokePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	revoked?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SetFullWidthMutationKeySpecifier = ('fullWidth' | SetFullWidthMutationKeySpecifier)[];
export type SetFullWidthMutationFieldPolicy = {
	fullWidth?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialAuthJWTPayloadKeySpecifier = ('clientMutationId' | 'social' | 'token' | SocialAuthJWTPayloadKeySpecifier)[];
export type SocialAuthJWTPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	social?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialNodeKeySpecifier = ('created' | 'extraData' | 'id' | 'modified' | 'provider' | 'uid' | 'user' | SocialNodeKeySpecifier)[];
export type SocialNodeFieldPolicy = {
	created?: FieldPolicy<any> | FieldReadFunction<any>,
	extraData?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	modified?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialNodeConnectionKeySpecifier = ('edges' | 'pageInfo' | SocialNodeConnectionKeySpecifier)[];
export type SocialNodeConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialNodeEdgeKeySpecifier = ('cursor' | 'node' | SocialNodeEdgeKeySpecifier)[];
export type SocialNodeEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('connect' | 'gameInProgress' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	connect?: FieldPolicy<any> | FieldReadFunction<any>,
	gameInProgress?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserNodeKeySpecifier = ('createdAt' | 'gameSet' | 'id' | 'isActive' | 'isAdmin' | 'isStaff' | 'isSuperuser' | 'playerSet' | 'socialAuth' | 'updatedAt' | UserNodeKeySpecifier)[];
export type UserNodeFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	gameSet?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	isAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	isStaff?: FieldPolicy<any> | FieldReadFunction<any>,
	isSuperuser?: FieldPolicy<any> | FieldReadFunction<any>,
	playerSet?: FieldPolicy<any> | FieldReadFunction<any>,
	socialAuth?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserNodeConnectionKeySpecifier = ('edgeCount' | 'edges' | 'pageInfo' | 'totalCount' | UserNodeConnectionKeySpecifier)[];
export type UserNodeConnectionFieldPolicy = {
	edgeCount?: FieldPolicy<any> | FieldReadFunction<any>,
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserNodeEdgeKeySpecifier = ('cursor' | 'node' | UserNodeEdgeKeySpecifier)[];
export type UserNodeEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WhiteCardNodeKeySpecifier = ('createdAt' | 'genre' | 'id' | 'rating' | 'text' | 'updatedAt' | WhiteCardNodeKeySpecifier)[];
export type WhiteCardNodeFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	genre?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WhiteCardNodeConnectionKeySpecifier = ('edgeCount' | 'edges' | 'pageInfo' | 'totalCount' | WhiteCardNodeConnectionKeySpecifier)[];
export type WhiteCardNodeConnectionFieldPolicy = {
	edgeCount?: FieldPolicy<any> | FieldReadFunction<any>,
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WhiteCardNodeEdgeKeySpecifier = ('cursor' | 'node' | WhiteCardNodeEdgeKeySpecifier)[];
export type WhiteCardNodeEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	BlackCardNode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlackCardNodeKeySpecifier | (() => undefined | BlackCardNodeKeySpecifier),
		fields?: BlackCardNodeFieldPolicy,
	},
	BlackCardNodeConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlackCardNodeConnectionKeySpecifier | (() => undefined | BlackCardNodeConnectionKeySpecifier),
		fields?: BlackCardNodeConnectionFieldPolicy,
	},
	BlackCardNodeEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlackCardNodeEdgeKeySpecifier | (() => undefined | BlackCardNodeEdgeKeySpecifier),
		fields?: BlackCardNodeEdgeFieldPolicy,
	},
	ConnectSubscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConnectSubscriptionKeySpecifier | (() => undefined | ConnectSubscriptionKeySpecifier),
		fields?: ConnectSubscriptionFieldPolicy,
	},
	CreateGameMutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateGameMutationKeySpecifier | (() => undefined | CreateGameMutationKeySpecifier),
		fields?: CreateGameMutationFieldPolicy,
	},
	CreateNewGameMutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateNewGameMutationKeySpecifier | (() => undefined | CreateNewGameMutationKeySpecifier),
		fields?: CreateNewGameMutationFieldPolicy,
	},
	CreateUserMutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateUserMutationKeySpecifier | (() => undefined | CreateUserMutationKeySpecifier),
		fields?: CreateUserMutationFieldPolicy,
	},
	DeleteRefreshTokenCookiePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteRefreshTokenCookiePayloadKeySpecifier | (() => undefined | DeleteRefreshTokenCookiePayloadKeySpecifier),
		fields?: DeleteRefreshTokenCookiePayloadFieldPolicy,
	},
	GameInProgressSubscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GameInProgressSubscriptionKeySpecifier | (() => undefined | GameInProgressSubscriptionKeySpecifier),
		fields?: GameInProgressSubscriptionFieldPolicy,
	},
	GameNode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GameNodeKeySpecifier | (() => undefined | GameNodeKeySpecifier),
		fields?: GameNodeFieldPolicy,
	},
	GameNodeConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GameNodeConnectionKeySpecifier | (() => undefined | GameNodeConnectionKeySpecifier),
		fields?: GameNodeConnectionFieldPolicy,
	},
	GameNodeEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GameNodeEdgeKeySpecifier | (() => undefined | GameNodeEdgeKeySpecifier),
		fields?: GameNodeEdgeFieldPolicy,
	},
	GamePrivacyMutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GamePrivacyMutationKeySpecifier | (() => undefined | GamePrivacyMutationKeySpecifier),
		fields?: GamePrivacyMutationFieldPolicy,
	},
	GameStatusMutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GameStatusMutationKeySpecifier | (() => undefined | GameStatusMutationKeySpecifier),
		fields?: GameStatusMutationFieldPolicy,
	},
	GenreNode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GenreNodeKeySpecifier | (() => undefined | GenreNodeKeySpecifier),
		fields?: GenreNodeFieldPolicy,
	},
	GenreNodeConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GenreNodeConnectionKeySpecifier | (() => undefined | GenreNodeConnectionKeySpecifier),
		fields?: GenreNodeConnectionFieldPolicy,
	},
	GenreNodeEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GenreNodeEdgeKeySpecifier | (() => undefined | GenreNodeEdgeKeySpecifier),
		fields?: GenreNodeEdgeFieldPolicy,
	},
	JWTPayloadNode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JWTPayloadNodeKeySpecifier | (() => undefined | JWTPayloadNodeKeySpecifier),
		fields?: JWTPayloadNodeFieldPolicy,
	},
	JoinGameMutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JoinGameMutationKeySpecifier | (() => undefined | JoinGameMutationKeySpecifier),
		fields?: JoinGameMutationFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	NewGameNode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NewGameNodeKeySpecifier | (() => undefined | NewGameNodeKeySpecifier),
		fields?: NewGameNodeFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
	},
	ObtainJSONWebTokenMutationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ObtainJSONWebTokenMutationPayloadKeySpecifier | (() => undefined | ObtainJSONWebTokenMutationPayloadKeySpecifier),
		fields?: ObtainJSONWebTokenMutationPayloadFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	PlayerNode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlayerNodeKeySpecifier | (() => undefined | PlayerNodeKeySpecifier),
		fields?: PlayerNodeFieldPolicy,
	},
	PlayerNodeConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlayerNodeConnectionKeySpecifier | (() => undefined | PlayerNodeConnectionKeySpecifier),
		fields?: PlayerNodeConnectionFieldPolicy,
	},
	PlayerNodeEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlayerNodeEdgeKeySpecifier | (() => undefined | PlayerNodeEdgeKeySpecifier),
		fields?: PlayerNodeEdgeFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RefreshTokenMutationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RefreshTokenMutationPayloadKeySpecifier | (() => undefined | RefreshTokenMutationPayloadKeySpecifier),
		fields?: RefreshTokenMutationPayloadFieldPolicy,
	},
	RevokePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RevokePayloadKeySpecifier | (() => undefined | RevokePayloadKeySpecifier),
		fields?: RevokePayloadFieldPolicy,
	},
	SetFullWidthMutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SetFullWidthMutationKeySpecifier | (() => undefined | SetFullWidthMutationKeySpecifier),
		fields?: SetFullWidthMutationFieldPolicy,
	},
	SocialAuthJWTPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialAuthJWTPayloadKeySpecifier | (() => undefined | SocialAuthJWTPayloadKeySpecifier),
		fields?: SocialAuthJWTPayloadFieldPolicy,
	},
	SocialNode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialNodeKeySpecifier | (() => undefined | SocialNodeKeySpecifier),
		fields?: SocialNodeFieldPolicy,
	},
	SocialNodeConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialNodeConnectionKeySpecifier | (() => undefined | SocialNodeConnectionKeySpecifier),
		fields?: SocialNodeConnectionFieldPolicy,
	},
	SocialNodeEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialNodeEdgeKeySpecifier | (() => undefined | SocialNodeEdgeKeySpecifier),
		fields?: SocialNodeEdgeFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	UserNode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserNodeKeySpecifier | (() => undefined | UserNodeKeySpecifier),
		fields?: UserNodeFieldPolicy,
	},
	UserNodeConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserNodeConnectionKeySpecifier | (() => undefined | UserNodeConnectionKeySpecifier),
		fields?: UserNodeConnectionFieldPolicy,
	},
	UserNodeEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserNodeEdgeKeySpecifier | (() => undefined | UserNodeEdgeKeySpecifier),
		fields?: UserNodeEdgeFieldPolicy,
	},
	WhiteCardNode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WhiteCardNodeKeySpecifier | (() => undefined | WhiteCardNodeKeySpecifier),
		fields?: WhiteCardNodeFieldPolicy,
	},
	WhiteCardNodeConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WhiteCardNodeConnectionKeySpecifier | (() => undefined | WhiteCardNodeConnectionKeySpecifier),
		fields?: WhiteCardNodeConnectionFieldPolicy,
	},
	WhiteCardNodeEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WhiteCardNodeEdgeKeySpecifier | (() => undefined | WhiteCardNodeEdgeKeySpecifier),
		fields?: WhiteCardNodeEdgeFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ApiBlackCardPickChoices: ApiBlackCardPickChoices;
  ApiBlackCardRatingChoices: ApiBlackCardRatingChoices;
  ApiGameStatusChoices: ApiGameStatusChoices;
  ApiPlayerAvatarChoices: ApiPlayerAvatarChoices;
  ApiWhiteCardRatingChoices: ApiWhiteCardRatingChoices;
  BlackCardNode: ResolverTypeWrapper<BlackCardNode>;
  BlackCardNodeConnection: ResolverTypeWrapper<BlackCardNodeConnection>;
  BlackCardNodeEdge: ResolverTypeWrapper<BlackCardNodeEdge>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ConnectSubscription: ResolverTypeWrapper<ConnectSubscription>;
  CreateGameInput: CreateGameInput;
  CreateGameInputAddGamePlayerset: CreateGameInputAddGamePlayerset;
  CreateGameMutation: ResolverTypeWrapper<CreateGameMutation>;
  CreateGameMutationInput: CreateGameMutationInput;
  CreateNewGameMutation: ResolverTypeWrapper<CreateNewGameMutation>;
  CreateUserMutation: ResolverTypeWrapper<CreateUserMutation>;
  CreateUserMutationInput: CreateUserMutationInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteRefreshTokenCookieInput: DeleteRefreshTokenCookieInput;
  DeleteRefreshTokenCookiePayload: ResolverTypeWrapper<DeleteRefreshTokenCookiePayload>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GameInProgressSubscription: ResolverTypeWrapper<GameInProgressSubscription>;
  GameNode: ResolverTypeWrapper<GameNode>;
  GameNodeConnection: ResolverTypeWrapper<GameNodeConnection>;
  GameNodeEdge: ResolverTypeWrapper<GameNodeEdge>;
  GamePrivacyMutation: ResolverTypeWrapper<GamePrivacyMutation>;
  GameStatusMutation: ResolverTypeWrapper<GameStatusMutation>;
  GenreNode: ResolverTypeWrapper<GenreNode>;
  GenreNodeConnection: ResolverTypeWrapper<GenreNodeConnection>;
  GenreNodeEdge: ResolverTypeWrapper<GenreNodeEdge>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JWTPayloadNode: ResolverTypeWrapper<JwtPayloadNode>;
  JoinGameMutation: ResolverTypeWrapper<JoinGameMutation>;
  JoinGameMutationInput: JoinGameMutationInput;
  Mutation: ResolverTypeWrapper<{}>;
  NewGameNode: ResolverTypeWrapper<NewGameNode>;
  Node: ResolversTypes['BlackCardNode'] | ResolversTypes['GameNode'] | ResolversTypes['GenreNode'] | ResolversTypes['PlayerNode'] | ResolversTypes['SocialNode'] | ResolversTypes['UserNode'] | ResolversTypes['WhiteCardNode'];
  ObtainJSONWebTokenMutationInput: ObtainJsonWebTokenMutationInput;
  ObtainJSONWebTokenMutationPayload: ResolverTypeWrapper<ObtainJsonWebTokenMutationPayload>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PlayerNode: ResolverTypeWrapper<PlayerNode>;
  PlayerNodeConnection: ResolverTypeWrapper<PlayerNodeConnection>;
  PlayerNodeEdge: ResolverTypeWrapper<PlayerNodeEdge>;
  Query: ResolverTypeWrapper<{}>;
  RefreshTokenMutationInput: RefreshTokenMutationInput;
  RefreshTokenMutationPayload: ResolverTypeWrapper<RefreshTokenMutationPayload>;
  RevokeInput: RevokeInput;
  RevokePayload: ResolverTypeWrapper<RevokePayload>;
  SetFullWidthMutation: ResolverTypeWrapper<SetFullWidthMutation>;
  SetFullWidthMutationInput: SetFullWidthMutationInput;
  SocialAuthJWTInput: SocialAuthJwtInput;
  SocialAuthJWTPayload: ResolverTypeWrapper<SocialAuthJwtPayload>;
  SocialCamelJSON: ResolverTypeWrapper<Scalars['SocialCamelJSON']>;
  SocialNode: ResolverTypeWrapper<SocialNode>;
  SocialNodeConnection: ResolverTypeWrapper<SocialNodeConnection>;
  SocialNodeEdge: ResolverTypeWrapper<SocialNodeEdge>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateGamePrivacyInput: UpdateGamePrivacyInput;
  UpdateGameStatusInput: UpdateGameStatusInput;
  UserNode: ResolverTypeWrapper<UserNode>;
  UserNodeConnection: ResolverTypeWrapper<UserNodeConnection>;
  UserNodeEdge: ResolverTypeWrapper<UserNodeEdge>;
  WhiteCardNode: ResolverTypeWrapper<WhiteCardNode>;
  WhiteCardNodeConnection: ResolverTypeWrapper<WhiteCardNodeConnection>;
  WhiteCardNodeEdge: ResolverTypeWrapper<WhiteCardNodeEdge>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BlackCardNode: BlackCardNode;
  BlackCardNodeConnection: BlackCardNodeConnection;
  BlackCardNodeEdge: BlackCardNodeEdge;
  Boolean: Scalars['Boolean'];
  ConnectSubscription: ConnectSubscription;
  CreateGameInput: CreateGameInput;
  CreateGameInputAddGamePlayerset: CreateGameInputAddGamePlayerset;
  CreateGameMutation: CreateGameMutation;
  CreateGameMutationInput: CreateGameMutationInput;
  CreateNewGameMutation: CreateNewGameMutation;
  CreateUserMutation: CreateUserMutation;
  CreateUserMutationInput: CreateUserMutationInput;
  DateTime: Scalars['DateTime'];
  DeleteRefreshTokenCookieInput: DeleteRefreshTokenCookieInput;
  DeleteRefreshTokenCookiePayload: DeleteRefreshTokenCookiePayload;
  Float: Scalars['Float'];
  GameInProgressSubscription: GameInProgressSubscription;
  GameNode: GameNode;
  GameNodeConnection: GameNodeConnection;
  GameNodeEdge: GameNodeEdge;
  GamePrivacyMutation: GamePrivacyMutation;
  GameStatusMutation: GameStatusMutation;
  GenreNode: GenreNode;
  GenreNodeConnection: GenreNodeConnection;
  GenreNodeEdge: GenreNodeEdge;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JWTPayloadNode: JwtPayloadNode;
  JoinGameMutation: JoinGameMutation;
  JoinGameMutationInput: JoinGameMutationInput;
  Mutation: {};
  NewGameNode: NewGameNode;
  Node: ResolversParentTypes['BlackCardNode'] | ResolversParentTypes['GameNode'] | ResolversParentTypes['GenreNode'] | ResolversParentTypes['PlayerNode'] | ResolversParentTypes['SocialNode'] | ResolversParentTypes['UserNode'] | ResolversParentTypes['WhiteCardNode'];
  ObtainJSONWebTokenMutationInput: ObtainJsonWebTokenMutationInput;
  ObtainJSONWebTokenMutationPayload: ObtainJsonWebTokenMutationPayload;
  PageInfo: PageInfo;
  PlayerNode: PlayerNode;
  PlayerNodeConnection: PlayerNodeConnection;
  PlayerNodeEdge: PlayerNodeEdge;
  Query: {};
  RefreshTokenMutationInput: RefreshTokenMutationInput;
  RefreshTokenMutationPayload: RefreshTokenMutationPayload;
  RevokeInput: RevokeInput;
  RevokePayload: RevokePayload;
  SetFullWidthMutation: SetFullWidthMutation;
  SetFullWidthMutationInput: SetFullWidthMutationInput;
  SocialAuthJWTInput: SocialAuthJwtInput;
  SocialAuthJWTPayload: SocialAuthJwtPayload;
  SocialCamelJSON: Scalars['SocialCamelJSON'];
  SocialNode: SocialNode;
  SocialNodeConnection: SocialNodeConnection;
  SocialNodeEdge: SocialNodeEdge;
  String: Scalars['String'];
  Subscription: {};
  UpdateGamePrivacyInput: UpdateGamePrivacyInput;
  UpdateGameStatusInput: UpdateGameStatusInput;
  UserNode: UserNode;
  UserNodeConnection: UserNodeConnection;
  UserNodeEdge: UserNodeEdge;
  WhiteCardNode: WhiteCardNode;
  WhiteCardNodeConnection: WhiteCardNodeConnection;
  WhiteCardNodeEdge: WhiteCardNodeEdge;
}>;

export type BlackCardNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlackCardNode'] = ResolversParentTypes['BlackCardNode']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['GenreNode'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pick?: Resolver<ResolversTypes['ApiBlackCardPickChoices'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['ApiBlackCardRatingChoices'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlackCardNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlackCardNodeConnection'] = ResolversParentTypes['BlackCardNodeConnection']> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['BlackCardNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlackCardNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlackCardNodeEdge'] = ResolversParentTypes['BlackCardNodeEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['BlackCardNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConnectSubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectSubscription'] = ResolversParentTypes['ConnectSubscription']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  room?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateGameMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateGameMutation'] = ResolversParentTypes['CreateGameMutation']> = ResolversObject<{
  game?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateNewGameMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateNewGameMutation'] = ResolversParentTypes['CreateNewGameMutation']> = ResolversObject<{
  newGame?: Resolver<Maybe<ResolversTypes['NewGameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateUserMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserMutation'] = ResolversParentTypes['CreateUserMutation']> = ResolversObject<{
  ok?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteRefreshTokenCookiePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteRefreshTokenCookiePayload'] = ResolversParentTypes['DeleteRefreshTokenCookiePayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameInProgressSubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameInProgressSubscription'] = ResolversParentTypes['GameInProgressSubscription']> = ResolversObject<{
  gameInProgress?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameNode'] = ResolversParentTypes['GameNode']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['UserNode'], ParentType, ContextType>;
  genres?: Resolver<ResolversTypes['GenreNodeConnection'], ParentType, ContextType, RequireFields<GameNodeGenresArgs, never>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinEndsAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  numPlayers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numSpectators?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  playerSet?: Resolver<ResolversTypes['PlayerNodeConnection'], ParentType, ContextType, RequireFields<GameNodePlayerSetArgs, never>>;
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  roundTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ApiGameStatusChoices'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  winner?: Resolver<Maybe<ResolversTypes['PlayerNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameNodeConnection'] = ResolversParentTypes['GameNodeConnection']> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['GameNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameNodeEdge'] = ResolversParentTypes['GameNodeEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GamePrivacyMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['GamePrivacyMutation'] = ResolversParentTypes['GamePrivacyMutation']> = ResolversObject<{
  game?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameStatusMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameStatusMutation'] = ResolversParentTypes['GameStatusMutation']> = ResolversObject<{
  game?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenreNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenreNode'] = ResolversParentTypes['GenreNode']> = ResolversObject<{
  blackcardSet?: Resolver<ResolversTypes['BlackCardNodeConnection'], ParentType, ContextType, RequireFields<GenreNodeBlackcardSetArgs, never>>;
  credit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gameSet?: Resolver<ResolversTypes['GameNodeConnection'], ParentType, ContextType, RequireFields<GenreNodeGameSetArgs, never>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  selected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  whitecardSet?: Resolver<ResolversTypes['WhiteCardNodeConnection'], ParentType, ContextType, RequireFields<GenreNodeWhitecardSetArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenreNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenreNodeConnection'] = ResolversParentTypes['GenreNodeConnection']> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['GenreNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenreNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenreNodeEdge'] = ResolversParentTypes['GenreNodeEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['GenreNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JwtPayloadNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['JWTPayloadNode'] = ResolversParentTypes['JWTPayloadNode']> = ResolversObject<{
  aud?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  exp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  iat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  iss?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  jti?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nbf?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sub?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JoinGameMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['JoinGameMutation'] = ResolversParentTypes['JoinGameMutation']> = ResolversObject<{
  ok?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  player?: Resolver<Maybe<ResolversTypes['PlayerNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createGame?: Resolver<Maybe<ResolversTypes['CreateGameMutation']>, ParentType, ContextType, RequireFields<MutationCreateGameArgs, 'input'>>;
  createNewGame?: Resolver<Maybe<ResolversTypes['CreateNewGameMutation']>, ParentType, ContextType, RequireFields<MutationCreateNewGameArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserMutation']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteRefreshTokenCookie?: Resolver<Maybe<ResolversTypes['DeleteRefreshTokenCookiePayload']>, ParentType, ContextType, RequireFields<MutationDeleteRefreshTokenCookieArgs, 'input'>>;
  gamePrivacy?: Resolver<Maybe<ResolversTypes['GamePrivacyMutation']>, ParentType, ContextType, RequireFields<MutationGamePrivacyArgs, 'id' | 'input'>>;
  gameStatus?: Resolver<Maybe<ResolversTypes['GameStatusMutation']>, ParentType, ContextType, RequireFields<MutationGameStatusArgs, 'id' | 'input'>>;
  joinGame?: Resolver<Maybe<ResolversTypes['JoinGameMutation']>, ParentType, ContextType, RequireFields<MutationJoinGameArgs, 'input'>>;
  refreshToken?: Resolver<Maybe<ResolversTypes['RefreshTokenMutationPayload']>, ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'input'>>;
  revokeRefreshToken?: Resolver<Maybe<ResolversTypes['RevokePayload']>, ParentType, ContextType, RequireFields<MutationRevokeRefreshTokenArgs, 'input'>>;
  setFullWidth?: Resolver<Maybe<ResolversTypes['SetFullWidthMutation']>, ParentType, ContextType, RequireFields<MutationSetFullWidthArgs, 'input'>>;
  socialAuth?: Resolver<Maybe<ResolversTypes['SocialAuthJWTPayload']>, ParentType, ContextType, RequireFields<MutationSocialAuthArgs, 'input'>>;
  tokenAuth?: Resolver<Maybe<ResolversTypes['ObtainJSONWebTokenMutationPayload']>, ParentType, ContextType, RequireFields<MutationTokenAuthArgs, 'input'>>;
}>;

export type NewGameNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewGameNode'] = ResolversParentTypes['NewGameNode']> = ResolversObject<{
  avatar?: Resolver<ResolversTypes['ApiPlayerAvatarChoices'], ParentType, ContextType>;
  genres?: Resolver<ReadonlyArray<Maybe<ResolversTypes['ID']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinEndsAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  numPlayers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numSpectators?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BlackCardNode' | 'GameNode' | 'GenreNode' | 'PlayerNode' | 'SocialNode' | 'UserNode' | 'WhiteCardNode', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type ObtainJsonWebTokenMutationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ObtainJSONWebTokenMutationPayload'] = ResolversParentTypes['ObtainJSONWebTokenMutationPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['JWTPayloadNode']>, ParentType, ContextType>;
  refreshExpiresIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerNode'] = ResolversParentTypes['PlayerNode']> = ResolversObject<{
  avatar?: Resolver<ResolversTypes['ApiPlayerAvatarChoices'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  czar?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  game?: Resolver<ResolversTypes['GameNode'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  spectator?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserNode'], ParentType, ContextType>;
  winner?: Resolver<ResolversTypes['GameNodeConnection'], ParentType, ContextType, RequireFields<PlayerNodeWinnerArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerNodeConnection'] = ResolversParentTypes['PlayerNodeConnection']> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['PlayerNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerNodeEdge'] = ResolversParentTypes['PlayerNodeEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['PlayerNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  blackCards?: Resolver<Maybe<ResolversTypes['BlackCardNodeConnection']>, ParentType, ContextType, RequireFields<QueryBlackCardsArgs, never>>;
  fullWidth?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  game?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType, RequireFields<QueryGameArgs, never>>;
  gameInProgress?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType>;
  games?: Resolver<Maybe<ResolversTypes['GameNodeConnection']>, ParentType, ContextType, RequireFields<QueryGamesArgs, never>>;
  genres?: Resolver<Maybe<ResolversTypes['GenreNodeConnection']>, ParentType, ContextType, RequireFields<QueryGenresArgs, never>>;
  newGame?: Resolver<Maybe<ResolversTypes['NewGameNode']>, ParentType, ContextType, RequireFields<QueryNewGameArgs, 'id'>>;
  users?: Resolver<Maybe<ResolversTypes['UserNodeConnection']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
  whiteCards?: Resolver<Maybe<ResolversTypes['WhiteCardNodeConnection']>, ParentType, ContextType, RequireFields<QueryWhiteCardsArgs, never>>;
}>;

export type RefreshTokenMutationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RefreshTokenMutationPayload'] = ResolversParentTypes['RefreshTokenMutationPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['JWTPayloadNode']>, ParentType, ContextType>;
  refreshExpiresIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RevokePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RevokePayload'] = ResolversParentTypes['RevokePayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revoked?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetFullWidthMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetFullWidthMutation'] = ResolversParentTypes['SetFullWidthMutation']> = ResolversObject<{
  fullWidth?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SocialAuthJwtPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialAuthJWTPayload'] = ResolversParentTypes['SocialAuthJWTPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  social?: Resolver<Maybe<ResolversTypes['SocialNode']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface SocialCamelJsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SocialCamelJSON'], any> {
  name: 'SocialCamelJSON';
}

export type SocialNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialNode'] = ResolversParentTypes['SocialNode']> = ResolversObject<{
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  extraData?: Resolver<Maybe<ResolversTypes['SocialCamelJSON']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modified?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserNode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SocialNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialNodeConnection'] = ResolversParentTypes['SocialNodeConnection']> = ResolversObject<{
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['SocialNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SocialNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialNodeEdge'] = ResolversParentTypes['SocialNodeEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['SocialNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  connect?: SubscriptionResolver<Maybe<ResolversTypes['ConnectSubscription']>, "connect", ParentType, ContextType, RequireFields<SubscriptionConnectArgs, 'room'>>;
  gameInProgress?: SubscriptionResolver<Maybe<ResolversTypes['GameInProgressSubscription']>, "gameInProgress", ParentType, ContextType>;
}>;

export type UserNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNode'] = ResolversParentTypes['UserNode']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  gameSet?: Resolver<ResolversTypes['GameNodeConnection'], ParentType, ContextType, RequireFields<UserNodeGameSetArgs, never>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isStaff?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSuperuser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  playerSet?: Resolver<ResolversTypes['PlayerNodeConnection'], ParentType, ContextType, RequireFields<UserNodePlayerSetArgs, never>>;
  socialAuth?: Resolver<ResolversTypes['SocialNodeConnection'], ParentType, ContextType, RequireFields<UserNodeSocialAuthArgs, never>>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNodeConnection'] = ResolversParentTypes['UserNodeConnection']> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['UserNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNodeEdge'] = ResolversParentTypes['UserNodeEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['UserNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WhiteCardNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WhiteCardNode'] = ResolversParentTypes['WhiteCardNode']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['GenreNode'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['ApiWhiteCardRatingChoices'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WhiteCardNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WhiteCardNodeConnection'] = ResolversParentTypes['WhiteCardNodeConnection']> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['WhiteCardNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WhiteCardNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WhiteCardNodeEdge'] = ResolversParentTypes['WhiteCardNodeEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WhiteCardNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  BlackCardNode?: BlackCardNodeResolvers<ContextType>;
  BlackCardNodeConnection?: BlackCardNodeConnectionResolvers<ContextType>;
  BlackCardNodeEdge?: BlackCardNodeEdgeResolvers<ContextType>;
  ConnectSubscription?: ConnectSubscriptionResolvers<ContextType>;
  CreateGameMutation?: CreateGameMutationResolvers<ContextType>;
  CreateNewGameMutation?: CreateNewGameMutationResolvers<ContextType>;
  CreateUserMutation?: CreateUserMutationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeleteRefreshTokenCookiePayload?: DeleteRefreshTokenCookiePayloadResolvers<ContextType>;
  GameInProgressSubscription?: GameInProgressSubscriptionResolvers<ContextType>;
  GameNode?: GameNodeResolvers<ContextType>;
  GameNodeConnection?: GameNodeConnectionResolvers<ContextType>;
  GameNodeEdge?: GameNodeEdgeResolvers<ContextType>;
  GamePrivacyMutation?: GamePrivacyMutationResolvers<ContextType>;
  GameStatusMutation?: GameStatusMutationResolvers<ContextType>;
  GenreNode?: GenreNodeResolvers<ContextType>;
  GenreNodeConnection?: GenreNodeConnectionResolvers<ContextType>;
  GenreNodeEdge?: GenreNodeEdgeResolvers<ContextType>;
  JWTPayloadNode?: JwtPayloadNodeResolvers<ContextType>;
  JoinGameMutation?: JoinGameMutationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NewGameNode?: NewGameNodeResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  ObtainJSONWebTokenMutationPayload?: ObtainJsonWebTokenMutationPayloadResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PlayerNode?: PlayerNodeResolvers<ContextType>;
  PlayerNodeConnection?: PlayerNodeConnectionResolvers<ContextType>;
  PlayerNodeEdge?: PlayerNodeEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RefreshTokenMutationPayload?: RefreshTokenMutationPayloadResolvers<ContextType>;
  RevokePayload?: RevokePayloadResolvers<ContextType>;
  SetFullWidthMutation?: SetFullWidthMutationResolvers<ContextType>;
  SocialAuthJWTPayload?: SocialAuthJwtPayloadResolvers<ContextType>;
  SocialCamelJSON?: GraphQLScalarType;
  SocialNode?: SocialNodeResolvers<ContextType>;
  SocialNodeConnection?: SocialNodeConnectionResolvers<ContextType>;
  SocialNodeEdge?: SocialNodeEdgeResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UserNode?: UserNodeResolvers<ContextType>;
  UserNodeConnection?: UserNodeConnectionResolvers<ContextType>;
  UserNodeEdge?: UserNodeEdgeResolvers<ContextType>;
  WhiteCardNode?: WhiteCardNodeResolvers<ContextType>;
  WhiteCardNodeConnection?: WhiteCardNodeConnectionResolvers<ContextType>;
  WhiteCardNodeEdge?: WhiteCardNodeEdgeResolvers<ContextType>;
}>;

