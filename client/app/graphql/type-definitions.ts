import { gql } from '@apollo/client/core';

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

  enum ApiBlackCardPickChoices {
    A_1

    A_2
  }

  enum ApiBlackCardRatingChoices {
    NORMAL
  }

  enum ApiGameStatusChoices {
    AWAITING_ANSWERS

    AWAITING_CZAR

    AWAITING_PLAYERS

    GAME_CANCELED

    GAME_ENDED

    GAME_STARTED
  }

  enum ApiPlayerAvatarChoices {
    ABBY

    ALFRED

    ANDINA

    ASTRO

    CAMILE

    DOROTHY

    DUDAI

    EDUARDO

    GENERAL

    GRACE

    IRANIR

    JENNIFER

    LABRAT

    LUTHER

    RAINBOWNESS

    SHIN
  }

  enum ApiWhiteCardRatingChoices {
    NORMAL
  }

  type BlackCardNode implements Node {
    createdAt: DateTime!
    genre: GenreNode!

    id: ID!
    pick: ApiBlackCardPickChoices!
    rating: ApiBlackCardRatingChoices!

    text: String!
    updatedAt: DateTime!
  }

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

  input CreateGameInput {
    genres: [ID]!

    joinEndsAt: DateTime

    numPlayers: Int

    numSpectators: Int
    playerSet: [ID]

    roundTime: Int

    rounds: Int
  }

  type CreateGameMutation {
    game: GameNode
  }

  input CreateGameMutationInput {
    avatar: ApiPlayerAvatarChoices!
    genres: [ID]!
    joinEndsAt: DateTime!
    numPlayers: Int!
    numSpectators: Int!
    roundTime: Int!
    rounds: Int!
    status: String!
  }

  type CreateNewGameMutation {
    newGame: NewGameNode
  }

  type CreateUserMutation {
    ok: Boolean
  }

  input CreateUserMutationInput {
    email: String!
    password: String!
  }

  scalar DateTime

  input DeleteRefreshTokenCookieInput {
    clientMutationId: String
  }

  type DeleteRefreshTokenCookiePayload {
    clientMutationId: String
    deleted: Boolean!
  }

  type GameNode implements Node {
    createdAt: DateTime!
    creator: UserNode!
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

    joinEndsAt: DateTime!

    numPlayers: Int!

    numSpectators: Int!
    playerSet(
      after: String
      avatar: String
      before: String
      createdAt: DateTime
      czar: Boolean
      first: Int
      game: ID
      last: Int
      offset: Int
      score: Int
      spectator: Boolean
      updatedAt: DateTime
      user: ID
    ): PlayerNodeConnection!

    roundTime: Int!

    rounds: Int!
    status: ApiGameStatusChoices!
    updatedAt: DateTime!
    winner: UserNode
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
      rating: String
      text: String
      updatedAt: DateTime
    ): BlackCardNodeConnection!

    credit: String

    description: String!
    gameSet(
      after: String
      before: String
      createdAt: DateTime
      creator: ID
      first: Int
      genres: [ID]
      joinEndsAt: DateTime
      last: Int
      numPlayers: Int
      numSpectators: Int
      offset: Int
      roundTime: Int
      rounds: Int
      status: String
      updatedAt: DateTime
      winner: ID
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

  type JWTPayloadNode {
    aud: String
    email: String
    emailVerified: Boolean
    exp: Int
    iat: Int
    iss: String
    jti: String
    name: String
    nbf: Int
    provider: String
    sub: Int
    username: String
  }

  type JoinGameMutation {
    game: GameNode
    ok: Boolean
  }

  input JoinGameMutationInput {
    gameId: ID!
    playerId: ID!
  }

  type JoinGameSubscription {
    event: String
  }

  type Mutation {
    createGame(input: CreateGameInput!): CreateGameMutation
    createNewGame(input: CreateGameMutationInput!): CreateNewGameMutation
    createUser(input: CreateUserMutationInput!): CreateUserMutation
    deleteRefreshTokenCookie(input: DeleteRefreshTokenCookieInput!): DeleteRefreshTokenCookiePayload
    joinGame(input: JoinGameMutationInput!): JoinGameMutation
    refreshToken(input: RefreshTokenMutationInput!): RefreshTokenMutationPayload
    revokeRefreshToken(input: RevokeInput!): RevokePayload
    setFullWidth(input: SetFullWidthMutationInput!): SetFullWidthMutation

    socialAuth(input: SocialAuthJWTInput!): SocialAuthJWTPayload
    tokenAuth(input: ObtainJSONWebTokenMutationInput!): ObtainJSONWebTokenMutationPayload
    updateGameStatus(id: ID!, input: UpdateGameInput!): UpdateGameStatusMutation
  }

  type NewGameNode {
    avatar: ApiPlayerAvatarChoices!
    genres: [ID]!
    id: ID!
    joinEndsAt: DateTime!
    numPlayers: Int!
    numSpectators: Int!
    roundTime: Int!
    rounds: Int!
    status: String!
  }

  interface Node {
    id: ID!
  }

  input ObtainJSONWebTokenMutationInput {
    clientMutationId: String
    password: String!
    username: String!
  }

  type ObtainJSONWebTokenMutationPayload {
    clientMutationId: String
    payload: JWTPayloadNode
    refreshExpiresIn: Int!
    refreshToken: String!
    token: String!
  }

  type PageInfo {
    endCursor: String

    hasNextPage: Boolean!

    hasPreviousPage: Boolean!

    startCursor: String
  }

  type PlayerNode implements Node {
    avatar: ApiPlayerAvatarChoices!
    createdAt: DateTime!
    czar: Boolean!
    game: GameNode!

    id: ID!
    score: Int!
    spectator: Boolean!
    updatedAt: DateTime!
    user: UserNode!
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
      rating: String
      text: String
      updatedAt: DateTime
    ): BlackCardNodeConnection

    fullWidth: Boolean
    game(id: ID): GameNode

    games(
      after: String
      before: String
      createdAt: DateTime
      creator: ID
      first: Int
      genres: [ID]
      joinEndsAt: DateTime
      last: Int
      numPlayers: Int
      numSpectators: Int
      offset: Int
      roundTime: Int
      rounds: Int
      status: String
      updatedAt: DateTime
      winner: ID
    ): GameNodeConnection

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
    newGame(id: ID!): NewGameNode

    users(
      after: String
      before: String
      createdAt: DateTime
      first: Int
      groups: [ID]
      isActive: Boolean
      isAdmin: Boolean
      isStaff: Boolean
      isSuperuser: Boolean
      last: Int
      offset: Int
      updatedAt: DateTime
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
  }

  input RefreshTokenMutationInput {
    clientMutationId: String
    refreshToken: String
  }

  type RefreshTokenMutationPayload {
    clientMutationId: String
    payload: JWTPayloadNode
    refreshExpiresIn: Int!
    refreshToken: String!
    token: String!
  }

  input RevokeInput {
    clientMutationId: String
    refreshToken: String
  }

  type RevokePayload {
    clientMutationId: String
    revoked: Int!
  }

  type SetFullWidthMutation {
    fullWidth: Boolean
  }

  input SetFullWidthMutationInput {
    fullWidth: Boolean!
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

  scalar SocialCamelJSON

  type SocialNode implements Node {
    created: DateTime!
    extraData: SocialCamelJSON

    id: ID!
    modified: DateTime!
    provider: String!
    uid: String!
    user: UserNode!
  }

  type SocialNodeConnection {
    edges: [SocialNodeEdge]!

    pageInfo: PageInfo!
  }

  type SocialNodeEdge {
    cursor: String!

    node: SocialNode
  }

  type Subscription {
    joinGame(gameRoom: String, user: String): JoinGameSubscription
  }

  input UpdateGameInput {
    status: ApiGameStatusChoices!
  }

  type UpdateGameStatusMutation {
    game: GameNode
  }

  type UserNode implements Node {
    createdAt: DateTime!
    gameSet(
      after: String
      before: String
      createdAt: DateTime
      creator: ID
      first: Int
      genres: [ID]
      joinEndsAt: DateTime
      last: Int
      numPlayers: Int
      numSpectators: Int
      offset: Int
      roundTime: Int
      rounds: Int
      status: String
      updatedAt: DateTime
      winner: ID
    ): GameNodeConnection!

    id: ID!

    isActive: Boolean!

    isAdmin: Boolean!

    isStaff: Boolean!

    isSuperuser: Boolean!
    playerSet(
      after: String
      avatar: String
      before: String
      createdAt: DateTime
      czar: Boolean
      first: Int
      game: ID
      last: Int
      offset: Int
      score: Int
      spectator: Boolean
      updatedAt: DateTime
      user: ID
    ): PlayerNodeConnection!
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
    updatedAt: DateTime!
    winners(
      after: String
      before: String
      createdAt: DateTime
      creator: ID
      first: Int
      genres: [ID]
      joinEndsAt: DateTime
      last: Int
      numPlayers: Int
      numSpectators: Int
      offset: Int
      roundTime: Int
      rounds: Int
      status: String
      updatedAt: DateTime
      winner: ID
    ): GameNodeConnection!
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

  type WhiteCardNode implements Node {
    createdAt: DateTime!
    genre: GenreNode!

    id: ID!
    rating: ApiWhiteCardRatingChoices!

    text: String!
    updatedAt: DateTime!
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
`;
