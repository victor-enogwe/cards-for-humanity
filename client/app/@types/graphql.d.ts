import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
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
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
}

/** Root Query for the cards against humanity api. */
export interface Query {
  readonly __typename?: 'Query';
  readonly blackCards?: Maybe<BlackCardNodeConnection>;
  readonly game?: Maybe<GameNode>;
  /** all cards genre */
  readonly genres?: Maybe<GenreNodeConnection>;
  /**
   * @client
   *  user authenticated flag
   */
  readonly isLoggedIn?: Maybe<Scalars['Boolean']>;
  readonly newGame?: Maybe<NewGameNode>;
  readonly profile?: Maybe<UserNode>;
  readonly whiteCards?: Maybe<WhiteCardNodeConnection>;
}

/** Root Query for the cards against humanity api. */
export interface QueryBlackCardsArgs {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  first?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['ID']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  pick?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
}

/** Root Query for the cards against humanity api. */
export interface QueryGameArgs {
  id?: Maybe<Scalars['ID']>;
}

/** Root Query for the cards against humanity api. */
export interface QueryGenresArgs {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  credit?: Maybe<Scalars['String']>;
  credit_Icontains?: Maybe<Scalars['String']>;
  credit_Istartswith?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_Icontains?: Maybe<Scalars['String']>;
  description_Istartswith?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Float']>;
  id_Gt?: Maybe<Scalars['Float']>;
  id_Lt?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}

/** Root Query for the cards against humanity api. */
export interface QueryNewGameArgs {
  id: Scalars['ID'];
}

/** Root Query for the cards against humanity api. */
export interface QueryWhiteCardsArgs {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['ID']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  text_Icontains?: Maybe<Scalars['String']>;
  text_Istartswith?: Maybe<Scalars['String']>;
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

export interface BlackCardNode extends Node {
  readonly __typename?: 'BlackCardNode';
  readonly createdAt: Scalars['DateTime'];
  readonly genre: GenreNode;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  readonly pick: ApiBlackCardPickChoices;
  /** text allows 5-255 characters(alphabets and -,_,?,',",space) */
  readonly text: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
}

/** An object with an ID */
export interface Node {
  /** The ID of the object. */
  readonly id: Scalars['ID'];
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
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  first?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['ID']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  pick?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
}

export interface GenreNodeGameSetArgs {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  first?: Maybe<Scalars['Int']>;
  genres?: Maybe<ReadonlyArray<Maybe<Scalars['ID']>>>;
  last?: Maybe<Scalars['Int']>;
  numPlayers?: Maybe<Scalars['Int']>;
  numSpectators?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  rounds?: Maybe<Scalars['Int']>;
  roundTime?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
}

export interface GenreNodeWhitecardSetArgs {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['ID']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  text_Icontains?: Maybe<Scalars['String']>;
  text_Istartswith?: Maybe<Scalars['String']>;
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

export interface GameNode extends Node {
  readonly __typename?: 'GameNode';
  readonly createdAt: Scalars['DateTime'];
  readonly genres: GenreNodeConnection;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  /** no of players */
  readonly numPlayers: Scalars['Int'];
  /** no of spectators */
  readonly numSpectators: Scalars['Int'];
  readonly playerSet: PlayerNodeConnection;
  /** no of game rounds */
  readonly rounds: Scalars['Int'];
  /** seconds */
  readonly roundTime: Scalars['Int'];
  readonly status: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
}

export interface GameNodeGenresArgs {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  credit?: Maybe<Scalars['String']>;
  credit_Icontains?: Maybe<Scalars['String']>;
  credit_Istartswith?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_Icontains?: Maybe<Scalars['String']>;
  description_Istartswith?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Float']>;
  id_Gt?: Maybe<Scalars['Float']>;
  id_Lt?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}

export interface GameNodePlayerSetArgs {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  czar?: Maybe<Scalars['Boolean']>;
  first?: Maybe<Scalars['Int']>;
  game?: Maybe<Scalars['ID']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<Scalars['ID']>;
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

export interface PlayerNode extends Node {
  readonly __typename?: 'PlayerNode';
  readonly createdAt: Scalars['DateTime'];
  readonly czar: Scalars['Boolean'];
  readonly game: GameNode;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  readonly score: Scalars['Int'];
  readonly updatedAt: Scalars['DateTime'];
  readonly user: UserNode;
}

export interface UserNode extends Node {
  readonly __typename?: 'UserNode';
  readonly dateJoined: Scalars['DateTime'];
  readonly email: Scalars['String'];
  readonly firstName: Scalars['String'];
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  readonly isActive: Scalars['Boolean'];
  /** Designates whether the user can log into this admin site. */
  readonly isStaff: Scalars['Boolean'];
  /** Designates that this user has all permissions without explicitly assigning them. */
  readonly isSuperuser: Scalars['Boolean'];
  readonly lastLogin?: Maybe<Scalars['DateTime']>;
  readonly lastName: Scalars['String'];
  readonly playerSet: PlayerNodeConnection;
  readonly socialAuth: SocialNodeConnection;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  readonly username: Scalars['String'];
}

export interface UserNodePlayerSetArgs {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  czar?: Maybe<Scalars['Boolean']>;
  first?: Maybe<Scalars['Int']>;
  game?: Maybe<Scalars['ID']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<Scalars['ID']>;
}

export interface UserNodeSocialAuthArgs {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  provider?: Maybe<Scalars['String']>;
  provider_In?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  uid?: Maybe<Scalars['String']>;
  uid_In?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
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

export interface WhiteCardNode extends Node {
  readonly __typename?: 'WhiteCardNode';
  readonly createdAt: Scalars['DateTime'];
  readonly genre: GenreNode;
  /** The ID of the object. */
  readonly id: Scalars['ID'];
  /** text allows 2-255 characters(alphabets and -,_,.,',",space) */
  readonly text: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
}

/** An enumeration. */
export enum ApiBlackCardPickChoices {
  /** pick1 */
  A_1 = 'A_1',
  /** pick2 */
  A_2 = 'A_2',
}

export interface NewGameNode {
  readonly __typename?: 'NewGameNode';
  readonly genres: ReadonlyArray<Maybe<Scalars['ID']>>;
  readonly id: Scalars['ID'];
  readonly numPlayers: Scalars['Int'];
  readonly numSpectators: Scalars['Int'];
  readonly rounds: Scalars['Int'];
  readonly roundTime: Scalars['Int'];
  readonly status: Scalars['String'];
}

/** Root Mutation for the cards against humanity api. */
export interface Mutation {
  readonly __typename?: 'Mutation';
  readonly createGame?: Maybe<CreateGameMutation>;
  readonly createNewGame?: Maybe<CreateNewGameMutation>;
  readonly createUser?: Maybe<CreateUserPayload>;
  readonly deleteRefreshTokenCookie?: Maybe<DeleteRefreshTokenCookiePayload>;
  readonly deleteTokenCookie?: Maybe<DeleteJsonWebTokenCookiePayload>;
  readonly refreshToken?: Maybe<RefreshPayload>;
  readonly revokeToken?: Maybe<RevokePayload>;
  readonly saveProfile?: Maybe<SaveProfileMutation>;
  /** Social Auth for JSON Web Token (JWT) */
  readonly socialAuth?: Maybe<SocialAuthJwtPayload>;
  /** Obtain JSON Web Token mutation */
  readonly tokenAuth?: Maybe<ObtainJsonWebTokenPayload>;
  readonly updateGame?: Maybe<EditGameMutation>;
  readonly verifyToken?: Maybe<VerifyPayload>;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationCreateGameArgs {
  input: CreateGameInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationCreateNewGameArgs {
  input: CreateGameInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationCreateUserArgs {
  email: Scalars['String'];
  password: Scalars['String'];
}

/** Root Mutation for the cards against humanity api. */
export interface MutationDeleteRefreshTokenCookieArgs {
  input: DeleteRefreshTokenCookieInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationDeleteTokenCookieArgs {
  input: DeleteJsonWebTokenCookieInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationRefreshTokenArgs {
  input: RefreshInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationRevokeTokenArgs {
  input: RevokeInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationSaveProfileArgs {
  input: SaveProfileInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationSocialAuthArgs {
  input: SocialAuthJwtInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationTokenAuthArgs {
  input: ObtainJsonWebTokenInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationUpdateGameArgs {
  id: Scalars['ID'];
  input: UpdateGameInput;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationVerifyTokenArgs {
  input: VerifyInput;
}

export interface CreateGameInput {
  readonly genres: ReadonlyArray<Maybe<Scalars['ID']>>;
  /** no of players */
  readonly numPlayers?: Maybe<Scalars['Int']>;
  /** no of spectators */
  readonly numSpectators?: Maybe<Scalars['Int']>;
  readonly playerSet?: Maybe<ReadonlyArray<Maybe<Scalars['ID']>>>;
  /** no of game rounds */
  readonly rounds?: Maybe<Scalars['Int']>;
  /** seconds */
  readonly roundTime?: Maybe<Scalars['Int']>;
}

export interface CreateGameMutation {
  readonly __typename?: 'CreateGameMutation';
  readonly game?: Maybe<GameNode>;
}

export interface CreateNewGameMutation {
  readonly __typename?: 'CreateNewGameMutation';
  readonly newGame?: Maybe<NewGameNode>;
}

export type CreateUserPayload = CreateUserFailEmailExists | CreateUserFailOthers | CreateUserSuccess;

export interface CreateUserFailEmailExists {
  readonly __typename?: 'CreateUserFailEmailExists';
  readonly errorMessage: Scalars['String'];
}

export interface CreateUserFailOthers {
  readonly __typename?: 'CreateUserFailOthers';
  readonly errorMessage: Scalars['String'];
}

export interface CreateUserSuccess {
  readonly __typename?: 'CreateUserSuccess';
  readonly token?: Maybe<Scalars['String']>;
  readonly user?: Maybe<UserNode>;
}

export interface DeleteRefreshTokenCookieInput {
  readonly clientMutationId?: Maybe<Scalars['String']>;
}

export interface DeleteRefreshTokenCookiePayload {
  readonly __typename?: 'DeleteRefreshTokenCookiePayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly deleted: Scalars['Boolean'];
}

export interface DeleteJsonWebTokenCookieInput {
  readonly clientMutationId?: Maybe<Scalars['String']>;
}

export interface DeleteJsonWebTokenCookiePayload {
  readonly __typename?: 'DeleteJSONWebTokenCookiePayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly deleted: Scalars['Boolean'];
}

export interface RefreshInput {
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly refreshToken?: Maybe<Scalars['String']>;
}

export interface RefreshPayload {
  readonly __typename?: 'RefreshPayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly payload: Scalars['GenericScalar'];
  readonly refreshExpiresIn: Scalars['Int'];
  readonly refreshToken: Scalars['String'];
  readonly token: Scalars['String'];
}

export interface RevokeInput {
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly refreshToken?: Maybe<Scalars['String']>;
}

export interface RevokePayload {
  readonly __typename?: 'RevokePayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly revoked: Scalars['Int'];
}

export interface SaveProfileInput {
  readonly id: Scalars['ID'];
  readonly username: Scalars['String'];
}

export interface SaveProfileMutation {
  readonly __typename?: 'SaveProfileMutation';
  readonly profile?: Maybe<UserNode>;
}

export interface SocialAuthJwtInput {
  readonly accessToken: Scalars['String'];
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly provider: Scalars['String'];
}

/** Social Auth for JSON Web Token (JWT) */
export interface SocialAuthJwtPayload {
  readonly __typename?: 'SocialAuthJWTPayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly social?: Maybe<SocialNode>;
  readonly token?: Maybe<Scalars['String']>;
}

export interface ObtainJsonWebTokenInput {
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly password: Scalars['String'];
  readonly username: Scalars['String'];
}

/** Obtain JSON Web Token mutation */
export interface ObtainJsonWebTokenPayload {
  readonly __typename?: 'ObtainJSONWebTokenPayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly payload: Scalars['GenericScalar'];
  readonly refreshExpiresIn: Scalars['Int'];
  readonly refreshToken: Scalars['String'];
  readonly token: Scalars['String'];
}

export interface UpdateGameInput {
  readonly status: Scalars['String'];
}

export interface EditGameMutation {
  readonly __typename?: 'EditGameMutation';
  readonly game?: Maybe<GameNode>;
}

export interface VerifyInput {
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly token?: Maybe<Scalars['String']>;
}

export interface VerifyPayload {
  readonly __typename?: 'VerifyPayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly payload: Scalars['GenericScalar'];
}

/** Root Subscription for the cards against humanity api. */
export interface Subscription {
  readonly __typename?: 'Subscription';
  readonly gameSubscription?: Maybe<GameSubscriptionNode>;
  readonly genreSubscription?: Maybe<GenreSubscriptionType>;
}

export interface GameSubscriptionNode {
  readonly __typename?: 'GameSubscriptionNode';
  readonly event?: Maybe<Scalars['String']>;
}

export interface GenreSubscriptionType {
  readonly __typename?: 'GenreSubscriptionType';
  readonly event?: Maybe<Scalars['String']>;
}

export type QueryKeySpecifier = (
  | 'blackCards'
  | 'game'
  | 'genres'
  | 'isLoggedIn'
  | 'newGame'
  | 'profile'
  | 'whiteCards'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  blackCards?: FieldPolicy<any> | FieldReadFunction<any>;
  game?: FieldPolicy<any> | FieldReadFunction<any>;
  genres?: FieldPolicy<any> | FieldReadFunction<any>;
  isLoggedIn?: FieldPolicy<any> | FieldReadFunction<any>;
  newGame?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  whiteCards?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BlackCardNodeConnectionKeySpecifier = (
  | 'edgeCount'
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | BlackCardNodeConnectionKeySpecifier
)[];
export type BlackCardNodeConnectionFieldPolicy = {
  edgeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BlackCardNodeEdgeKeySpecifier = ('cursor' | 'node' | BlackCardNodeEdgeKeySpecifier)[];
export type BlackCardNodeEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BlackCardNodeKeySpecifier = ('createdAt' | 'genre' | 'id' | 'pick' | 'text' | 'updatedAt' | BlackCardNodeKeySpecifier)[];
export type BlackCardNodeFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  genre?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  pick?: FieldPolicy<any> | FieldReadFunction<any>;
  text?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenreNodeKeySpecifier = (
  | 'blackcardSet'
  | 'credit'
  | 'description'
  | 'gameSet'
  | 'id'
  | 'selected'
  | 'whitecardSet'
  | GenreNodeKeySpecifier
)[];
export type GenreNodeFieldPolicy = {
  blackcardSet?: FieldPolicy<any> | FieldReadFunction<any>;
  credit?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  gameSet?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  selected?: FieldPolicy<any> | FieldReadFunction<any>;
  whitecardSet?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GameNodeConnectionKeySpecifier = ('edgeCount' | 'edges' | 'pageInfo' | 'totalCount' | GameNodeConnectionKeySpecifier)[];
export type GameNodeConnectionFieldPolicy = {
  edgeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GameNodeEdgeKeySpecifier = ('cursor' | 'node' | GameNodeEdgeKeySpecifier)[];
export type GameNodeEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GameNodeKeySpecifier = (
  | 'createdAt'
  | 'genres'
  | 'id'
  | 'numPlayers'
  | 'numSpectators'
  | 'playerSet'
  | 'rounds'
  | 'roundTime'
  | 'status'
  | 'updatedAt'
  | GameNodeKeySpecifier
)[];
export type GameNodeFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  genres?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  numPlayers?: FieldPolicy<any> | FieldReadFunction<any>;
  numSpectators?: FieldPolicy<any> | FieldReadFunction<any>;
  playerSet?: FieldPolicy<any> | FieldReadFunction<any>;
  rounds?: FieldPolicy<any> | FieldReadFunction<any>;
  roundTime?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenreNodeConnectionKeySpecifier = ('edgeCount' | 'edges' | 'pageInfo' | 'totalCount' | GenreNodeConnectionKeySpecifier)[];
export type GenreNodeConnectionFieldPolicy = {
  edgeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenreNodeEdgeKeySpecifier = ('cursor' | 'node' | GenreNodeEdgeKeySpecifier)[];
export type GenreNodeEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>;
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>;
  startCursor?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PlayerNodeConnectionKeySpecifier = ('edgeCount' | 'edges' | 'pageInfo' | 'totalCount' | PlayerNodeConnectionKeySpecifier)[];
export type PlayerNodeConnectionFieldPolicy = {
  edgeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PlayerNodeEdgeKeySpecifier = ('cursor' | 'node' | PlayerNodeEdgeKeySpecifier)[];
export type PlayerNodeEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PlayerNodeKeySpecifier = ('createdAt' | 'czar' | 'game' | 'id' | 'score' | 'updatedAt' | 'user' | PlayerNodeKeySpecifier)[];
export type PlayerNodeFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  czar?: FieldPolicy<any> | FieldReadFunction<any>;
  game?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  score?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserNodeKeySpecifier = (
  | 'dateJoined'
  | 'email'
  | 'firstName'
  | 'id'
  | 'isActive'
  | 'isStaff'
  | 'isSuperuser'
  | 'lastLogin'
  | 'lastName'
  | 'playerSet'
  | 'socialAuth'
  | 'username'
  | UserNodeKeySpecifier
)[];
export type UserNodeFieldPolicy = {
  dateJoined?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  firstName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isActive?: FieldPolicy<any> | FieldReadFunction<any>;
  isStaff?: FieldPolicy<any> | FieldReadFunction<any>;
  isSuperuser?: FieldPolicy<any> | FieldReadFunction<any>;
  lastLogin?: FieldPolicy<any> | FieldReadFunction<any>;
  lastName?: FieldPolicy<any> | FieldReadFunction<any>;
  playerSet?: FieldPolicy<any> | FieldReadFunction<any>;
  socialAuth?: FieldPolicy<any> | FieldReadFunction<any>;
  username?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SocialNodeConnectionKeySpecifier = ('edges' | 'pageInfo' | SocialNodeConnectionKeySpecifier)[];
export type SocialNodeConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SocialNodeEdgeKeySpecifier = ('cursor' | 'node' | SocialNodeEdgeKeySpecifier)[];
export type SocialNodeEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SocialNodeKeySpecifier = ('created' | 'extraData' | 'id' | 'modified' | 'provider' | 'uid' | 'user' | SocialNodeKeySpecifier)[];
export type SocialNodeFieldPolicy = {
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  extraData?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  modified?: FieldPolicy<any> | FieldReadFunction<any>;
  provider?: FieldPolicy<any> | FieldReadFunction<any>;
  uid?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WhiteCardNodeConnectionKeySpecifier = (
  | 'edgeCount'
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | WhiteCardNodeConnectionKeySpecifier
)[];
export type WhiteCardNodeConnectionFieldPolicy = {
  edgeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WhiteCardNodeEdgeKeySpecifier = ('cursor' | 'node' | WhiteCardNodeEdgeKeySpecifier)[];
export type WhiteCardNodeEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WhiteCardNodeKeySpecifier = ('createdAt' | 'genre' | 'id' | 'text' | 'updatedAt' | WhiteCardNodeKeySpecifier)[];
export type WhiteCardNodeFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  genre?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  text?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewGameNodeKeySpecifier = (
  | 'genres'
  | 'id'
  | 'numPlayers'
  | 'numSpectators'
  | 'rounds'
  | 'roundTime'
  | 'status'
  | NewGameNodeKeySpecifier
)[];
export type NewGameNodeFieldPolicy = {
  genres?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  numPlayers?: FieldPolicy<any> | FieldReadFunction<any>;
  numSpectators?: FieldPolicy<any> | FieldReadFunction<any>;
  rounds?: FieldPolicy<any> | FieldReadFunction<any>;
  roundTime?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | 'createGame'
  | 'createNewGame'
  | 'createUser'
  | 'deleteRefreshTokenCookie'
  | 'deleteTokenCookie'
  | 'refreshToken'
  | 'revokeToken'
  | 'saveProfile'
  | 'socialAuth'
  | 'tokenAuth'
  | 'updateGame'
  | 'verifyToken'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  createGame?: FieldPolicy<any> | FieldReadFunction<any>;
  createNewGame?: FieldPolicy<any> | FieldReadFunction<any>;
  createUser?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteRefreshTokenCookie?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTokenCookie?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  revokeToken?: FieldPolicy<any> | FieldReadFunction<any>;
  saveProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  socialAuth?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenAuth?: FieldPolicy<any> | FieldReadFunction<any>;
  updateGame?: FieldPolicy<any> | FieldReadFunction<any>;
  verifyToken?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateGameMutationKeySpecifier = ('game' | CreateGameMutationKeySpecifier)[];
export type CreateGameMutationFieldPolicy = {
  game?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateNewGameMutationKeySpecifier = ('newGame' | CreateNewGameMutationKeySpecifier)[];
export type CreateNewGameMutationFieldPolicy = {
  newGame?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUserFailEmailExistsKeySpecifier = ('errorMessage' | CreateUserFailEmailExistsKeySpecifier)[];
export type CreateUserFailEmailExistsFieldPolicy = {
  errorMessage?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUserFailOthersKeySpecifier = ('errorMessage' | CreateUserFailOthersKeySpecifier)[];
export type CreateUserFailOthersFieldPolicy = {
  errorMessage?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateUserSuccessKeySpecifier = ('token' | 'user' | CreateUserSuccessKeySpecifier)[];
export type CreateUserSuccessFieldPolicy = {
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteRefreshTokenCookiePayloadKeySpecifier = ('clientMutationId' | 'deleted' | DeleteRefreshTokenCookiePayloadKeySpecifier)[];
export type DeleteRefreshTokenCookiePayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  deleted?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteJSONWebTokenCookiePayloadKeySpecifier = ('clientMutationId' | 'deleted' | DeleteJSONWebTokenCookiePayloadKeySpecifier)[];
export type DeleteJSONWebTokenCookiePayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  deleted?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RefreshPayloadKeySpecifier = (
  | 'clientMutationId'
  | 'payload'
  | 'refreshExpiresIn'
  | 'refreshToken'
  | 'token'
  | RefreshPayloadKeySpecifier
)[];
export type RefreshPayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  payload?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshExpiresIn?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevokePayloadKeySpecifier = ('clientMutationId' | 'revoked' | RevokePayloadKeySpecifier)[];
export type RevokePayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  revoked?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SaveProfileMutationKeySpecifier = ('profile' | SaveProfileMutationKeySpecifier)[];
export type SaveProfileMutationFieldPolicy = {
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SocialAuthJWTPayloadKeySpecifier = ('clientMutationId' | 'social' | 'token' | SocialAuthJWTPayloadKeySpecifier)[];
export type SocialAuthJWTPayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  social?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ObtainJSONWebTokenPayloadKeySpecifier = (
  | 'clientMutationId'
  | 'payload'
  | 'refreshExpiresIn'
  | 'refreshToken'
  | 'token'
  | ObtainJSONWebTokenPayloadKeySpecifier
)[];
export type ObtainJSONWebTokenPayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  payload?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshExpiresIn?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EditGameMutationKeySpecifier = ('game' | EditGameMutationKeySpecifier)[];
export type EditGameMutationFieldPolicy = {
  game?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type VerifyPayloadKeySpecifier = ('clientMutationId' | 'payload' | VerifyPayloadKeySpecifier)[];
export type VerifyPayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  payload?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SubscriptionKeySpecifier = ('gameSubscription' | 'genreSubscription' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
  gameSubscription?: FieldPolicy<any> | FieldReadFunction<any>;
  genreSubscription?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GameSubscriptionNodeKeySpecifier = ('event' | GameSubscriptionNodeKeySpecifier)[];
export type GameSubscriptionNodeFieldPolicy = {
  event?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenreSubscriptionTypeKeySpecifier = ('event' | GenreSubscriptionTypeKeySpecifier)[];
export type GenreSubscriptionTypeFieldPolicy = {
  event?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  BlackCardNodeConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | BlackCardNodeConnectionKeySpecifier | (() => undefined | BlackCardNodeConnectionKeySpecifier);
    fields?: BlackCardNodeConnectionFieldPolicy;
  };
  BlackCardNodeEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | BlackCardNodeEdgeKeySpecifier | (() => undefined | BlackCardNodeEdgeKeySpecifier);
    fields?: BlackCardNodeEdgeFieldPolicy;
  };
  BlackCardNode?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | BlackCardNodeKeySpecifier | (() => undefined | BlackCardNodeKeySpecifier);
    fields?: BlackCardNodeFieldPolicy;
  };
  Node?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier);
    fields?: NodeFieldPolicy;
  };
  GenreNode?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GenreNodeKeySpecifier | (() => undefined | GenreNodeKeySpecifier);
    fields?: GenreNodeFieldPolicy;
  };
  GameNodeConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GameNodeConnectionKeySpecifier | (() => undefined | GameNodeConnectionKeySpecifier);
    fields?: GameNodeConnectionFieldPolicy;
  };
  GameNodeEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GameNodeEdgeKeySpecifier | (() => undefined | GameNodeEdgeKeySpecifier);
    fields?: GameNodeEdgeFieldPolicy;
  };
  GameNode?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GameNodeKeySpecifier | (() => undefined | GameNodeKeySpecifier);
    fields?: GameNodeFieldPolicy;
  };
  GenreNodeConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GenreNodeConnectionKeySpecifier | (() => undefined | GenreNodeConnectionKeySpecifier);
    fields?: GenreNodeConnectionFieldPolicy;
  };
  GenreNodeEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GenreNodeEdgeKeySpecifier | (() => undefined | GenreNodeEdgeKeySpecifier);
    fields?: GenreNodeEdgeFieldPolicy;
  };
  PageInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier);
    fields?: PageInfoFieldPolicy;
  };
  PlayerNodeConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PlayerNodeConnectionKeySpecifier | (() => undefined | PlayerNodeConnectionKeySpecifier);
    fields?: PlayerNodeConnectionFieldPolicy;
  };
  PlayerNodeEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PlayerNodeEdgeKeySpecifier | (() => undefined | PlayerNodeEdgeKeySpecifier);
    fields?: PlayerNodeEdgeFieldPolicy;
  };
  PlayerNode?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PlayerNodeKeySpecifier | (() => undefined | PlayerNodeKeySpecifier);
    fields?: PlayerNodeFieldPolicy;
  };
  UserNode?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserNodeKeySpecifier | (() => undefined | UserNodeKeySpecifier);
    fields?: UserNodeFieldPolicy;
  };
  SocialNodeConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SocialNodeConnectionKeySpecifier | (() => undefined | SocialNodeConnectionKeySpecifier);
    fields?: SocialNodeConnectionFieldPolicy;
  };
  SocialNodeEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SocialNodeEdgeKeySpecifier | (() => undefined | SocialNodeEdgeKeySpecifier);
    fields?: SocialNodeEdgeFieldPolicy;
  };
  SocialNode?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SocialNodeKeySpecifier | (() => undefined | SocialNodeKeySpecifier);
    fields?: SocialNodeFieldPolicy;
  };
  WhiteCardNodeConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | WhiteCardNodeConnectionKeySpecifier | (() => undefined | WhiteCardNodeConnectionKeySpecifier);
    fields?: WhiteCardNodeConnectionFieldPolicy;
  };
  WhiteCardNodeEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | WhiteCardNodeEdgeKeySpecifier | (() => undefined | WhiteCardNodeEdgeKeySpecifier);
    fields?: WhiteCardNodeEdgeFieldPolicy;
  };
  WhiteCardNode?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | WhiteCardNodeKeySpecifier | (() => undefined | WhiteCardNodeKeySpecifier);
    fields?: WhiteCardNodeFieldPolicy;
  };
  NewGameNode?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NewGameNodeKeySpecifier | (() => undefined | NewGameNodeKeySpecifier);
    fields?: NewGameNodeFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  CreateGameMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CreateGameMutationKeySpecifier | (() => undefined | CreateGameMutationKeySpecifier);
    fields?: CreateGameMutationFieldPolicy;
  };
  CreateNewGameMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CreateNewGameMutationKeySpecifier | (() => undefined | CreateNewGameMutationKeySpecifier);
    fields?: CreateNewGameMutationFieldPolicy;
  };
  CreateUserFailEmailExists?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CreateUserFailEmailExistsKeySpecifier | (() => undefined | CreateUserFailEmailExistsKeySpecifier);
    fields?: CreateUserFailEmailExistsFieldPolicy;
  };
  CreateUserFailOthers?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CreateUserFailOthersKeySpecifier | (() => undefined | CreateUserFailOthersKeySpecifier);
    fields?: CreateUserFailOthersFieldPolicy;
  };
  CreateUserSuccess?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CreateUserSuccessKeySpecifier | (() => undefined | CreateUserSuccessKeySpecifier);
    fields?: CreateUserSuccessFieldPolicy;
  };
  DeleteRefreshTokenCookiePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DeleteRefreshTokenCookiePayloadKeySpecifier | (() => undefined | DeleteRefreshTokenCookiePayloadKeySpecifier);
    fields?: DeleteRefreshTokenCookiePayloadFieldPolicy;
  };
  DeleteJSONWebTokenCookiePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | DeleteJSONWebTokenCookiePayloadKeySpecifier | (() => undefined | DeleteJSONWebTokenCookiePayloadKeySpecifier);
    fields?: DeleteJSONWebTokenCookiePayloadFieldPolicy;
  };
  RefreshPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RefreshPayloadKeySpecifier | (() => undefined | RefreshPayloadKeySpecifier);
    fields?: RefreshPayloadFieldPolicy;
  };
  RevokePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RevokePayloadKeySpecifier | (() => undefined | RevokePayloadKeySpecifier);
    fields?: RevokePayloadFieldPolicy;
  };
  SaveProfileMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SaveProfileMutationKeySpecifier | (() => undefined | SaveProfileMutationKeySpecifier);
    fields?: SaveProfileMutationFieldPolicy;
  };
  SocialAuthJWTPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SocialAuthJWTPayloadKeySpecifier | (() => undefined | SocialAuthJWTPayloadKeySpecifier);
    fields?: SocialAuthJWTPayloadFieldPolicy;
  };
  ObtainJSONWebTokenPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ObtainJSONWebTokenPayloadKeySpecifier | (() => undefined | ObtainJSONWebTokenPayloadKeySpecifier);
    fields?: ObtainJSONWebTokenPayloadFieldPolicy;
  };
  EditGameMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EditGameMutationKeySpecifier | (() => undefined | EditGameMutationKeySpecifier);
    fields?: EditGameMutationFieldPolicy;
  };
  VerifyPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | VerifyPayloadKeySpecifier | (() => undefined | VerifyPayloadKeySpecifier);
    fields?: VerifyPayloadFieldPolicy;
  };
  Subscription?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier);
    fields?: SubscriptionFieldPolicy;
  };
  GameSubscriptionNode?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GameSubscriptionNodeKeySpecifier | (() => undefined | GameSubscriptionNodeKeySpecifier);
    fields?: GameSubscriptionNodeFieldPolicy;
  };
  GenreSubscriptionType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GenreSubscriptionTypeKeySpecifier | (() => undefined | GenreSubscriptionTypeKeySpecifier);
    fields?: GenreSubscriptionTypeFieldPolicy;
  };
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
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
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
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  BlackCardNodeConnection: ResolverTypeWrapper<BlackCardNodeConnection>;
  BlackCardNodeEdge: ResolverTypeWrapper<BlackCardNodeEdge>;
  BlackCardNode: ResolverTypeWrapper<BlackCardNode>;
  Node:
    | ResolversTypes['BlackCardNode']
    | ResolversTypes['GenreNode']
    | ResolversTypes['GameNode']
    | ResolversTypes['PlayerNode']
    | ResolversTypes['UserNode']
    | ResolversTypes['SocialNode']
    | ResolversTypes['WhiteCardNode'];
  GenreNode: ResolverTypeWrapper<GenreNode>;
  GameNodeConnection: ResolverTypeWrapper<GameNodeConnection>;
  GameNodeEdge: ResolverTypeWrapper<GameNodeEdge>;
  GameNode: ResolverTypeWrapper<GameNode>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GenreNodeConnection: ResolverTypeWrapper<GenreNodeConnection>;
  GenreNodeEdge: ResolverTypeWrapper<GenreNodeEdge>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  PlayerNodeConnection: ResolverTypeWrapper<PlayerNodeConnection>;
  PlayerNodeEdge: ResolverTypeWrapper<PlayerNodeEdge>;
  PlayerNode: ResolverTypeWrapper<PlayerNode>;
  UserNode: ResolverTypeWrapper<UserNode>;
  SocialNodeConnection: ResolverTypeWrapper<SocialNodeConnection>;
  SocialNodeEdge: ResolverTypeWrapper<SocialNodeEdge>;
  SocialNode: ResolverTypeWrapper<SocialNode>;
  SocialCamelJSON: ResolverTypeWrapper<Scalars['SocialCamelJSON']>;
  WhiteCardNodeConnection: ResolverTypeWrapper<WhiteCardNodeConnection>;
  WhiteCardNodeEdge: ResolverTypeWrapper<WhiteCardNodeEdge>;
  WhiteCardNode: ResolverTypeWrapper<WhiteCardNode>;
  ApiBlackCardPickChoices: ApiBlackCardPickChoices;
  NewGameNode: ResolverTypeWrapper<NewGameNode>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateGameInput: CreateGameInput;
  CreateGameMutation: ResolverTypeWrapper<CreateGameMutation>;
  CreateNewGameMutation: ResolverTypeWrapper<CreateNewGameMutation>;
  CreateUserPayload:
    | ResolversTypes['CreateUserFailEmailExists']
    | ResolversTypes['CreateUserFailOthers']
    | ResolversTypes['CreateUserSuccess'];
  CreateUserFailEmailExists: ResolverTypeWrapper<CreateUserFailEmailExists>;
  CreateUserFailOthers: ResolverTypeWrapper<CreateUserFailOthers>;
  CreateUserSuccess: ResolverTypeWrapper<CreateUserSuccess>;
  DeleteRefreshTokenCookieInput: DeleteRefreshTokenCookieInput;
  DeleteRefreshTokenCookiePayload: ResolverTypeWrapper<DeleteRefreshTokenCookiePayload>;
  DeleteJSONWebTokenCookieInput: DeleteJsonWebTokenCookieInput;
  DeleteJSONWebTokenCookiePayload: ResolverTypeWrapper<DeleteJsonWebTokenCookiePayload>;
  RefreshInput: RefreshInput;
  RefreshPayload: ResolverTypeWrapper<RefreshPayload>;
  GenericScalar: ResolverTypeWrapper<Scalars['GenericScalar']>;
  RevokeInput: RevokeInput;
  RevokePayload: ResolverTypeWrapper<RevokePayload>;
  SaveProfileInput: SaveProfileInput;
  SaveProfileMutation: ResolverTypeWrapper<SaveProfileMutation>;
  SocialAuthJWTInput: SocialAuthJwtInput;
  SocialAuthJWTPayload: ResolverTypeWrapper<SocialAuthJwtPayload>;
  ObtainJSONWebTokenInput: ObtainJsonWebTokenInput;
  ObtainJSONWebTokenPayload: ResolverTypeWrapper<ObtainJsonWebTokenPayload>;
  UpdateGameInput: UpdateGameInput;
  EditGameMutation: ResolverTypeWrapper<EditGameMutation>;
  VerifyInput: VerifyInput;
  VerifyPayload: ResolverTypeWrapper<VerifyPayload>;
  Subscription: ResolverTypeWrapper<{}>;
  GameSubscriptionNode: ResolverTypeWrapper<GameSubscriptionNode>;
  GenreSubscriptionType: ResolverTypeWrapper<GenreSubscriptionType>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  Int: Scalars['Int'];
  ID: Scalars['ID'];
  BlackCardNodeConnection: BlackCardNodeConnection;
  BlackCardNodeEdge: BlackCardNodeEdge;
  BlackCardNode: BlackCardNode;
  Node:
    | ResolversParentTypes['BlackCardNode']
    | ResolversParentTypes['GenreNode']
    | ResolversParentTypes['GameNode']
    | ResolversParentTypes['PlayerNode']
    | ResolversParentTypes['UserNode']
    | ResolversParentTypes['SocialNode']
    | ResolversParentTypes['WhiteCardNode'];
  GenreNode: GenreNode;
  GameNodeConnection: GameNodeConnection;
  GameNodeEdge: GameNodeEdge;
  GameNode: GameNode;
  Float: Scalars['Float'];
  GenreNodeConnection: GenreNodeConnection;
  GenreNodeEdge: GenreNodeEdge;
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean'];
  PlayerNodeConnection: PlayerNodeConnection;
  PlayerNodeEdge: PlayerNodeEdge;
  PlayerNode: PlayerNode;
  UserNode: UserNode;
  SocialNodeConnection: SocialNodeConnection;
  SocialNodeEdge: SocialNodeEdge;
  SocialNode: SocialNode;
  SocialCamelJSON: Scalars['SocialCamelJSON'];
  WhiteCardNodeConnection: WhiteCardNodeConnection;
  WhiteCardNodeEdge: WhiteCardNodeEdge;
  WhiteCardNode: WhiteCardNode;
  NewGameNode: NewGameNode;
  Mutation: {};
  CreateGameInput: CreateGameInput;
  CreateGameMutation: CreateGameMutation;
  CreateNewGameMutation: CreateNewGameMutation;
  CreateUserPayload:
    | ResolversParentTypes['CreateUserFailEmailExists']
    | ResolversParentTypes['CreateUserFailOthers']
    | ResolversParentTypes['CreateUserSuccess'];
  CreateUserFailEmailExists: CreateUserFailEmailExists;
  CreateUserFailOthers: CreateUserFailOthers;
  CreateUserSuccess: CreateUserSuccess;
  DeleteRefreshTokenCookieInput: DeleteRefreshTokenCookieInput;
  DeleteRefreshTokenCookiePayload: DeleteRefreshTokenCookiePayload;
  DeleteJSONWebTokenCookieInput: DeleteJsonWebTokenCookieInput;
  DeleteJSONWebTokenCookiePayload: DeleteJsonWebTokenCookiePayload;
  RefreshInput: RefreshInput;
  RefreshPayload: RefreshPayload;
  GenericScalar: Scalars['GenericScalar'];
  RevokeInput: RevokeInput;
  RevokePayload: RevokePayload;
  SaveProfileInput: SaveProfileInput;
  SaveProfileMutation: SaveProfileMutation;
  SocialAuthJWTInput: SocialAuthJwtInput;
  SocialAuthJWTPayload: SocialAuthJwtPayload;
  ObtainJSONWebTokenInput: ObtainJsonWebTokenInput;
  ObtainJSONWebTokenPayload: ObtainJsonWebTokenPayload;
  UpdateGameInput: UpdateGameInput;
  EditGameMutation: EditGameMutation;
  VerifyInput: VerifyInput;
  VerifyPayload: VerifyPayload;
  Subscription: {};
  GameSubscriptionNode: GameSubscriptionNode;
  GenreSubscriptionType: GenreSubscriptionType;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  blackCards?: Resolver<
    Maybe<ResolversTypes['BlackCardNodeConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryBlackCardsArgs, never>
  >;
  game?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType, RequireFields<QueryGameArgs, never>>;
  genres?: Resolver<Maybe<ResolversTypes['GenreNodeConnection']>, ParentType, ContextType, RequireFields<QueryGenresArgs, never>>;
  isLoggedIn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  newGame?: Resolver<Maybe<ResolversTypes['NewGameNode']>, ParentType, ContextType, RequireFields<QueryNewGameArgs, 'id'>>;
  profile?: Resolver<Maybe<ResolversTypes['UserNode']>, ParentType, ContextType>;
  whiteCards?: Resolver<
    Maybe<ResolversTypes['WhiteCardNodeConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryWhiteCardsArgs, never>
  >;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type BlackCardNodeConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BlackCardNodeConnection'] = ResolversParentTypes['BlackCardNodeConnection'],
> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['BlackCardNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlackCardNodeEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BlackCardNodeEdge'] = ResolversParentTypes['BlackCardNodeEdge'],
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['BlackCardNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlackCardNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BlackCardNode'] = ResolversParentTypes['BlackCardNode'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['GenreNode'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pick?: Resolver<ResolversTypes['ApiBlackCardPickChoices'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node'],
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'BlackCardNode' | 'GenreNode' | 'GameNode' | 'PlayerNode' | 'UserNode' | 'SocialNode' | 'WhiteCardNode',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type GenreNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GenreNode'] = ResolversParentTypes['GenreNode'],
> = ResolversObject<{
  blackcardSet?: Resolver<
    ResolversTypes['BlackCardNodeConnection'],
    ParentType,
    ContextType,
    RequireFields<GenreNodeBlackcardSetArgs, never>
  >;
  credit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gameSet?: Resolver<ResolversTypes['GameNodeConnection'], ParentType, ContextType, RequireFields<GenreNodeGameSetArgs, never>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  selected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  whitecardSet?: Resolver<
    ResolversTypes['WhiteCardNodeConnection'],
    ParentType,
    ContextType,
    RequireFields<GenreNodeWhitecardSetArgs, never>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameNodeConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GameNodeConnection'] = ResolversParentTypes['GameNodeConnection'],
> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['GameNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameNodeEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GameNodeEdge'] = ResolversParentTypes['GameNodeEdge'],
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GameNode'] = ResolversParentTypes['GameNode'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  genres?: Resolver<ResolversTypes['GenreNodeConnection'], ParentType, ContextType, RequireFields<GameNodeGenresArgs, never>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numPlayers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numSpectators?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  playerSet?: Resolver<ResolversTypes['PlayerNodeConnection'], ParentType, ContextType, RequireFields<GameNodePlayerSetArgs, never>>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenreNodeConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GenreNodeConnection'] = ResolversParentTypes['GenreNodeConnection'],
> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['GenreNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenreNodeEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GenreNodeEdge'] = ResolversParentTypes['GenreNodeEdge'],
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['GenreNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo'],
> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerNodeConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlayerNodeConnection'] = ResolversParentTypes['PlayerNodeConnection'],
> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['PlayerNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerNodeEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlayerNodeEdge'] = ResolversParentTypes['PlayerNodeEdge'],
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['PlayerNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlayerNode'] = ResolversParentTypes['PlayerNode'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  czar?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  game?: Resolver<ResolversTypes['GameNode'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserNode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserNode'] = ResolversParentTypes['UserNode'],
> = ResolversObject<{
  dateJoined?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isStaff?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSuperuser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  playerSet?: Resolver<ResolversTypes['PlayerNodeConnection'], ParentType, ContextType, RequireFields<UserNodePlayerSetArgs, never>>;
  socialAuth?: Resolver<ResolversTypes['SocialNodeConnection'], ParentType, ContextType, RequireFields<UserNodeSocialAuthArgs, never>>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SocialNodeConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SocialNodeConnection'] = ResolversParentTypes['SocialNodeConnection'],
> = ResolversObject<{
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['SocialNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SocialNodeEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SocialNodeEdge'] = ResolversParentTypes['SocialNodeEdge'],
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['SocialNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SocialNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SocialNode'] = ResolversParentTypes['SocialNode'],
> = ResolversObject<{
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  extraData?: Resolver<Maybe<ResolversTypes['SocialCamelJSON']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modified?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserNode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface SocialCamelJsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SocialCamelJSON'], any> {
  name: 'SocialCamelJSON';
}

export type WhiteCardNodeConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WhiteCardNodeConnection'] = ResolversParentTypes['WhiteCardNodeConnection'],
> = ResolversObject<{
  edgeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<ReadonlyArray<Maybe<ResolversTypes['WhiteCardNodeEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WhiteCardNodeEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WhiteCardNodeEdge'] = ResolversParentTypes['WhiteCardNodeEdge'],
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WhiteCardNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WhiteCardNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WhiteCardNode'] = ResolversParentTypes['WhiteCardNode'],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['GenreNode'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewGameNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['NewGameNode'] = ResolversParentTypes['NewGameNode'],
> = ResolversObject<{
  genres?: Resolver<ReadonlyArray<Maybe<ResolversTypes['ID']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numPlayers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numSpectators?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  createGame?: Resolver<
    Maybe<ResolversTypes['CreateGameMutation']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateGameArgs, 'input'>
  >;
  createNewGame?: Resolver<
    Maybe<ResolversTypes['CreateNewGameMutation']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateNewGameArgs, 'input'>
  >;
  createUser?: Resolver<
    Maybe<ResolversTypes['CreateUserPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'email' | 'password'>
  >;
  deleteRefreshTokenCookie?: Resolver<
    Maybe<ResolversTypes['DeleteRefreshTokenCookiePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRefreshTokenCookieArgs, 'input'>
  >;
  deleteTokenCookie?: Resolver<
    Maybe<ResolversTypes['DeleteJSONWebTokenCookiePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTokenCookieArgs, 'input'>
  >;
  refreshToken?: Resolver<
    Maybe<ResolversTypes['RefreshPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationRefreshTokenArgs, 'input'>
  >;
  revokeToken?: Resolver<Maybe<ResolversTypes['RevokePayload']>, ParentType, ContextType, RequireFields<MutationRevokeTokenArgs, 'input'>>;
  saveProfile?: Resolver<
    Maybe<ResolversTypes['SaveProfileMutation']>,
    ParentType,
    ContextType,
    RequireFields<MutationSaveProfileArgs, 'input'>
  >;
  socialAuth?: Resolver<
    Maybe<ResolversTypes['SocialAuthJWTPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationSocialAuthArgs, 'input'>
  >;
  tokenAuth?: Resolver<
    Maybe<ResolversTypes['ObtainJSONWebTokenPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationTokenAuthArgs, 'input'>
  >;
  updateGame?: Resolver<
    Maybe<ResolversTypes['EditGameMutation']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateGameArgs, 'id' | 'input'>
  >;
  verifyToken?: Resolver<Maybe<ResolversTypes['VerifyPayload']>, ParentType, ContextType, RequireFields<MutationVerifyTokenArgs, 'input'>>;
}>;

export type CreateGameMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateGameMutation'] = ResolversParentTypes['CreateGameMutation'],
> = ResolversObject<{
  game?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateNewGameMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateNewGameMutation'] = ResolversParentTypes['CreateNewGameMutation'],
> = ResolversObject<{
  newGame?: Resolver<Maybe<ResolversTypes['NewGameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateUserPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateUserPayload'] = ResolversParentTypes['CreateUserPayload'],
> = ResolversObject<{
  __resolveType: TypeResolveFn<'CreateUserFailEmailExists' | 'CreateUserFailOthers' | 'CreateUserSuccess', ParentType, ContextType>;
}>;

export type CreateUserFailEmailExistsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateUserFailEmailExists'] = ResolversParentTypes['CreateUserFailEmailExists'],
> = ResolversObject<{
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateUserFailOthersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateUserFailOthers'] = ResolversParentTypes['CreateUserFailOthers'],
> = ResolversObject<{
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateUserSuccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateUserSuccess'] = ResolversParentTypes['CreateUserSuccess'],
> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteRefreshTokenCookiePayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteRefreshTokenCookiePayload'] = ResolversParentTypes['DeleteRefreshTokenCookiePayload'],
> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteJsonWebTokenCookiePayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteJSONWebTokenCookiePayload'] = ResolversParentTypes['DeleteJSONWebTokenCookiePayload'],
> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RefreshPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RefreshPayload'] = ResolversParentTypes['RefreshPayload'],
> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['GenericScalar'], ParentType, ContextType>;
  refreshExpiresIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GenericScalarScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GenericScalar'], any> {
  name: 'GenericScalar';
}

export type RevokePayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RevokePayload'] = ResolversParentTypes['RevokePayload'],
> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revoked?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaveProfileMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SaveProfileMutation'] = ResolversParentTypes['SaveProfileMutation'],
> = ResolversObject<{
  profile?: Resolver<Maybe<ResolversTypes['UserNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SocialAuthJwtPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SocialAuthJWTPayload'] = ResolversParentTypes['SocialAuthJWTPayload'],
> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  social?: Resolver<Maybe<ResolversTypes['SocialNode']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ObtainJsonWebTokenPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ObtainJSONWebTokenPayload'] = ResolversParentTypes['ObtainJSONWebTokenPayload'],
> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['GenericScalar'], ParentType, ContextType>;
  refreshExpiresIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditGameMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EditGameMutation'] = ResolversParentTypes['EditGameMutation'],
> = ResolversObject<{
  game?: Resolver<Maybe<ResolversTypes['GameNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifyPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VerifyPayload'] = ResolversParentTypes['VerifyPayload'],
> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['GenericScalar'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = ResolversObject<{
  gameSubscription?: SubscriptionResolver<Maybe<ResolversTypes['GameSubscriptionNode']>, 'gameSubscription', ParentType, ContextType>;
  genreSubscription?: SubscriptionResolver<Maybe<ResolversTypes['GenreSubscriptionType']>, 'genreSubscription', ParentType, ContextType>;
}>;

export type GameSubscriptionNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GameSubscriptionNode'] = ResolversParentTypes['GameSubscriptionNode'],
> = ResolversObject<{
  event?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenreSubscriptionTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GenreSubscriptionType'] = ResolversParentTypes['GenreSubscriptionType'],
> = ResolversObject<{
  event?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  BlackCardNodeConnection?: BlackCardNodeConnectionResolvers<ContextType>;
  BlackCardNodeEdge?: BlackCardNodeEdgeResolvers<ContextType>;
  BlackCardNode?: BlackCardNodeResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  GenreNode?: GenreNodeResolvers<ContextType>;
  GameNodeConnection?: GameNodeConnectionResolvers<ContextType>;
  GameNodeEdge?: GameNodeEdgeResolvers<ContextType>;
  GameNode?: GameNodeResolvers<ContextType>;
  GenreNodeConnection?: GenreNodeConnectionResolvers<ContextType>;
  GenreNodeEdge?: GenreNodeEdgeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PlayerNodeConnection?: PlayerNodeConnectionResolvers<ContextType>;
  PlayerNodeEdge?: PlayerNodeEdgeResolvers<ContextType>;
  PlayerNode?: PlayerNodeResolvers<ContextType>;
  UserNode?: UserNodeResolvers<ContextType>;
  SocialNodeConnection?: SocialNodeConnectionResolvers<ContextType>;
  SocialNodeEdge?: SocialNodeEdgeResolvers<ContextType>;
  SocialNode?: SocialNodeResolvers<ContextType>;
  SocialCamelJSON?: GraphQLScalarType;
  WhiteCardNodeConnection?: WhiteCardNodeConnectionResolvers<ContextType>;
  WhiteCardNodeEdge?: WhiteCardNodeEdgeResolvers<ContextType>;
  WhiteCardNode?: WhiteCardNodeResolvers<ContextType>;
  NewGameNode?: NewGameNodeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  CreateGameMutation?: CreateGameMutationResolvers<ContextType>;
  CreateNewGameMutation?: CreateNewGameMutationResolvers<ContextType>;
  CreateUserPayload?: CreateUserPayloadResolvers<ContextType>;
  CreateUserFailEmailExists?: CreateUserFailEmailExistsResolvers<ContextType>;
  CreateUserFailOthers?: CreateUserFailOthersResolvers<ContextType>;
  CreateUserSuccess?: CreateUserSuccessResolvers<ContextType>;
  DeleteRefreshTokenCookiePayload?: DeleteRefreshTokenCookiePayloadResolvers<ContextType>;
  DeleteJSONWebTokenCookiePayload?: DeleteJsonWebTokenCookiePayloadResolvers<ContextType>;
  RefreshPayload?: RefreshPayloadResolvers<ContextType>;
  GenericScalar?: GraphQLScalarType;
  RevokePayload?: RevokePayloadResolvers<ContextType>;
  SaveProfileMutation?: SaveProfileMutationResolvers<ContextType>;
  SocialAuthJWTPayload?: SocialAuthJwtPayloadResolvers<ContextType>;
  ObtainJSONWebTokenPayload?: ObtainJsonWebTokenPayloadResolvers<ContextType>;
  EditGameMutation?: EditGameMutationResolvers<ContextType>;
  VerifyPayload?: VerifyPayloadResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  GameSubscriptionNode?: GameSubscriptionNodeResolvers<ContextType>;
  GenreSubscriptionType?: GenreSubscriptionTypeResolvers<ContextType>;
}>;
