import { gql } from '@apollo/client/core';

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

  type Query {
    blackCards(
      after: String
      before: String
      createdAt: DateTime
      first: Int
      genre: ID
      last: Int
      offset: Int
      pick: String
      text: String
      updatedAt: DateTime
    ): BlackCardNodeConnection
    game(id: ID): GameNode

    genres(
      after: String
      before: String
      credit: String
      credit_Icontains: String
      credit_Istartswith: String
      description: String
      description_Icontains: String
      description_Istartswith: String
      first: Int
      id: Float
      id_Gt: Float
      id_Lt: Float
      last: Int
      offset: Int
    ): GenreNodeConnection

    isLoggedIn: Boolean
    newGame(id: ID!): NewGameNode
    profile: UserNode

    users(
      after: String
      before: String
      dateJoined: DateTime
      email: String
      first: Int
      firstName: String
      groups: [ID]
      isActive: Boolean
      isStaff: Boolean
      isSuperuser: Boolean
      last: Int
      lastLogin: DateTime
      lastName: String
      offset: Int
      password: String
      username: String
      userPermissions: [ID]
    ): UserNodeConnection
    whiteCards(
      after: String
      before: String
      first: Int
      genre: ID
      last: Int
      offset: Int
      text: String
      text_Icontains: String
      text_Istartswith: String
    ): WhiteCardNodeConnection
    whoami: UserNode
  }

  scalar DateTime

  type BlackCardNodeConnection {
    edgeCount: Int

    edges: [BlackCardNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type BlackCardNodeEdge {
    cursor: String!

    node: BlackCardNode
  }

  type BlackCardNode implements Node {
    createdAt: DateTime!
    genre: GenreNode!

    id: ID!
    pick: ApiBlackCardPickChoices!

    text: String!
    updatedAt: DateTime!
  }

  interface Node {
    id: ID!
  }

  type GenreNode implements Node {
    blackcardSet(
      after: String
      before: String
      createdAt: DateTime
      first: Int
      genre: ID
      last: Int
      offset: Int
      pick: String
      text: String
      updatedAt: DateTime
    ): BlackCardNodeConnection!

    credit: String

    description: String!
    gameSet(
      after: String
      before: String
      createdAt: DateTime
      first: Int
      genres: [ID]
      last: Int
      numPlayers: Int
      numSpectators: Int
      offset: Int
      rounds: Int
      roundTime: Int
      status: String
      updatedAt: DateTime
    ): GameNodeConnection!

    id: ID!
    selected: Boolean
    whitecardSet(
      after: String
      before: String
      first: Int
      genre: ID
      last: Int
      offset: Int
      text: String
      text_Icontains: String
      text_Istartswith: String
    ): WhiteCardNodeConnection!
  }

  type GameNodeConnection {
    edgeCount: Int

    edges: [GameNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type GameNodeEdge {
    cursor: String!

    node: GameNode
  }

  type GameNode implements Node {
    createdAt: DateTime!
    genres(
      after: String
      before: String
      credit: String
      credit_Icontains: String
      credit_Istartswith: String
      description: String
      description_Icontains: String
      description_Istartswith: String
      first: Int
      id: Float
      id_Gt: Float
      id_Lt: Float
      last: Int
      offset: Int
    ): GenreNodeConnection!

    id: ID!

    numPlayers: Int!

    numSpectators: Int!
    playerSet(
      after: String
      before: String
      createdAt: DateTime
      czar: Boolean
      first: Int
      game: ID
      last: Int
      offset: Int
      score: Int
      updatedAt: DateTime
      user: ID
    ): PlayerNodeConnection!

    rounds: Int!

    roundTime: Int!
    status: ApiGameStatusChoices!
    updatedAt: DateTime!
  }

  type GenreNodeConnection {
    edgeCount: Int

    edges: [GenreNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type GenreNodeEdge {
    cursor: String!

    node: GenreNode
  }

  type PageInfo {
    endCursor: String

    hasNextPage: Boolean!

    hasPreviousPage: Boolean!

    startCursor: String
  }

  type PlayerNodeConnection {
    edgeCount: Int

    edges: [PlayerNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type PlayerNodeEdge {
    cursor: String!

    node: PlayerNode
  }

  type PlayerNode implements Node {
    createdAt: DateTime!
    czar: Boolean!
    game: GameNode!

    id: ID!
    score: Int!
    updatedAt: DateTime!
    user: UserNode!
  }

  type UserNode implements Node {
    dateJoined: DateTime!
    email: String!
    firstName: String!

    id: ID!

    isActive: Boolean!

    isStaff: Boolean!

    isSuperuser: Boolean!
    lastLogin: DateTime
    lastName: String!
    playerSet(
      after: String
      before: String
      createdAt: DateTime
      czar: Boolean
      first: Int
      game: ID
      last: Int
      offset: Int
      score: Int
      updatedAt: DateTime
      user: ID
    ): PlayerNodeConnection!
    profile: ProfileNode
    socialAuth(
      after: String
      before: String
      first: Int
      last: Int
      offset: Int
      provider: String
      provider_In: [String]
      uid: String
      uid_In: [String]
    ): SocialNodeConnection!

    username: String!
  }

  type ProfileNode implements Node {
    id: ID!
    role: ApiProfileRoleChoices!
    user: UserNode!
  }

  enum ApiProfileRoleChoices {
    MANAGER

    USER
  }

  type SocialNodeConnection {
    edges: [SocialNodeEdge]!

    pageInfo: PageInfo!
  }

  type SocialNodeEdge {
    cursor: String!

    node: SocialNode
  }

  type SocialNode implements Node {
    created: DateTime!
    extraData: SocialCamelJSON

    id: ID!
    modified: DateTime!
    provider: String!
    uid: String!
    user: UserNode!
  }

  scalar SocialCamelJSON

  enum ApiGameStatusChoices {
    AWAITING_CZAR

    AWAITING_PLAYERS

    GAME_ENDED

    GAME_STARTED
  }

  type WhiteCardNodeConnection {
    edgeCount: Int

    edges: [WhiteCardNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type WhiteCardNodeEdge {
    cursor: String!

    node: WhiteCardNode
  }

  type WhiteCardNode implements Node {
    createdAt: DateTime!
    genre: GenreNode!

    id: ID!

    text: String!
    updatedAt: DateTime!
  }

  enum ApiBlackCardPickChoices {
    A_1

    A_2
  }

  type NewGameNode {
    genres: [ID]!
    id: ID!
    numPlayers: Int!
    numSpectators: Int!
    rounds: Int!
    roundTime: Int!
    status: String!
  }

  type UserNodeConnection {
    edgeCount: Int

    edges: [UserNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type UserNodeEdge {
    cursor: String!

    node: UserNode
  }

  type Mutation {
    createGame(input: CreateGameInput!): CreateGameMutation
    createNewGame(input: CreateGameInput!): CreateNewGameMutation
    createUser(email: String!, password: String!): CreateUserPayload
    deleteRefreshTokenCookie(input: DeleteRefreshTokenCookieInput!): DeleteRefreshTokenCookiePayload
    refreshToken(input: RefreshInput!): RefreshPayload
    saveProfile(input: SaveProfileInput!): SaveProfileMutation

    socialAuth(input: SocialAuthJWTInput!): SocialAuthJWTPayload
    tokenAuth(input: ObtainJSONWebTokenInput!): ObtainJSONWebTokenPayload
    updateGame(id: ID!, input: UpdateGameInput!): EditGameMutation
    verifyToken(input: VerifyInput!): VerifyPayload
  }

  input CreateGameInput {
    genres: [ID]!

    numPlayers: Int

    numSpectators: Int
    playerSet: [ID]

    rounds: Int

    roundTime: Int
  }

  type CreateGameMutation {
    game: GameNode
  }

  type CreateNewGameMutation {
    newGame: NewGameNode
  }

  union CreateUserPayload = CreateUserFailEmailExists | CreateUserFailOthers | CreateUserSuccess

  type CreateUserFailEmailExists {
    errorMessage: String!
  }

  type CreateUserFailOthers {
    errorMessage: String!
  }

  type CreateUserSuccess {
    profile: ProfileNode
    refreshToken: String
    token: String
    user: UserNode
  }

  input DeleteRefreshTokenCookieInput {
    clientMutationId: String
  }

  type DeleteRefreshTokenCookiePayload {
    clientMutationId: String
    deleted: Boolean!
  }

  input RefreshInput {
    clientMutationId: String
    refreshToken: String
  }

  type RefreshPayload {
    clientMutationId: String
    payload: GenericScalar!
    refreshExpiresIn: Int!
    refreshToken: String!
    token: String!
  }

  scalar GenericScalar

  input SaveProfileInput {
    id: ID!
    username: String!
  }

  type SaveProfileMutation {
    profile: UserNode
  }

  input SocialAuthJWTInput {
    accessToken: String!
    clientMutationId: String
    provider: String!
  }

  type SocialAuthJWTPayload {
    clientMutationId: String
    social: SocialNode
    token: String
  }

  input ObtainJSONWebTokenInput {
    clientMutationId: String
    password: String!
    username: String!
  }

  type ObtainJSONWebTokenPayload {
    clientMutationId: String
    payload: GenericScalar!
    refreshExpiresIn: Int!
    refreshToken: String!
    token: String!
  }

  input UpdateGameInput {
    status: ApiGameStatusChoices!
  }

  type EditGameMutation {
    game: GameNode
  }

  input VerifyInput {
    clientMutationId: String
    token: String
  }

  type VerifyPayload {
    clientMutationId: String
    payload: GenericScalar!
  }

  type Subscription {
    gameSubscription: GameSubscriptionNode
    genreSubscription: GenreSubscriptionType
  }

  type GameSubscriptionNode {
    event: String
  }

  type GenreSubscriptionType {
    event: String
  }
`;
