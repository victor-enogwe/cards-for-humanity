import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  readonly newGame?: Maybe<GameNode>;
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

/** Root Mutation for the cards against humanity api. */
export interface Mutation {
  readonly __typename?: 'Mutation';
  readonly createGame?: Maybe<CreateGameMutation>;
  readonly createGameLocal?: Maybe<GameNode>;
  readonly createUser?: Maybe<CreateUserPayload>;
  readonly refreshToken?: Maybe<RefreshPayload>;
  readonly revokeToken?: Maybe<RevokePayload>;
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
export interface MutationCreateGameLocalArgs {
  input?: Maybe<CreateGameInput>;
}

/** Root Mutation for the cards against humanity api. */
export interface MutationCreateUserArgs {
  email: Scalars['String'];
  password: Scalars['String'];
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
  readonly numPlayers: Scalars['Int'];
  /** no of spectators */
  readonly numSpectators: Scalars['Int'];
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

export interface RefreshInput {
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly token?: Maybe<Scalars['String']>;
}

export interface RefreshPayload {
  readonly __typename?: 'RefreshPayload';
  readonly clientMutationId?: Maybe<Scalars['String']>;
  readonly payload: Scalars['GenericScalar'];
  readonly refreshExpiresIn: Scalars['Int'];
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

export type QueryKeySpecifier = ('blackCards' | 'game' | 'genres' | 'newGame' | 'whiteCards' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
  blackCards?: FieldPolicy<any> | FieldReadFunction<any>;
  game?: FieldPolicy<any> | FieldReadFunction<any>;
  genres?: FieldPolicy<any> | FieldReadFunction<any>;
  newGame?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type MutationKeySpecifier = (
  | 'createGame'
  | 'createGameLocal'
  | 'createUser'
  | 'refreshToken'
  | 'revokeToken'
  | 'socialAuth'
  | 'tokenAuth'
  | 'updateGame'
  | 'verifyToken'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  createGame?: FieldPolicy<any> | FieldReadFunction<any>;
  createGameLocal?: FieldPolicy<any> | FieldReadFunction<any>;
  createUser?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  revokeToken?: FieldPolicy<any> | FieldReadFunction<any>;
  socialAuth?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenAuth?: FieldPolicy<any> | FieldReadFunction<any>;
  updateGame?: FieldPolicy<any> | FieldReadFunction<any>;
  verifyToken?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateGameMutationKeySpecifier = ('game' | CreateGameMutationKeySpecifier)[];
export type CreateGameMutationFieldPolicy = {
  game?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type RefreshPayloadKeySpecifier = ('clientMutationId' | 'payload' | 'refreshExpiresIn' | 'token' | RefreshPayloadKeySpecifier)[];
export type RefreshPayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  payload?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshExpiresIn?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RevokePayloadKeySpecifier = ('clientMutationId' | 'revoked' | RevokePayloadKeySpecifier)[];
export type RevokePayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  revoked?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | 'token'
  | ObtainJSONWebTokenPayloadKeySpecifier
)[];
export type ObtainJSONWebTokenPayloadFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  payload?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshExpiresIn?: FieldPolicy<any> | FieldReadFunction<any>;
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
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  CreateGameMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CreateGameMutationKeySpecifier | (() => undefined | CreateGameMutationKeySpecifier);
    fields?: CreateGameMutationFieldPolicy;
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
  RefreshPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RefreshPayloadKeySpecifier | (() => undefined | RefreshPayloadKeySpecifier);
    fields?: RefreshPayloadFieldPolicy;
  };
  RevokePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RevokePayloadKeySpecifier | (() => undefined | RevokePayloadKeySpecifier);
    fields?: RevokePayloadFieldPolicy;
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
