import { gql } from '@apollo/client/core';

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

  type AnswerNode implements Node {
    card: WhiteCardNode!
    createdAt: DateTime!
    game: GameNode!

    id: ID!
    player: PlayerNode!
    question: BlackCardNode!
    rating: ApiAnswerRatingChoices!

    round: Int!
    selected: Boolean!
    updatedAt: DateTime!
  }

  type AnswerNodeConnection {
    edgeCount: Int

    edges: [AnswerNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type AnswerNodeEdge {
    cursor: String!

    node: AnswerNode
  }

  enum ApiAnswerRatingChoices {
    BAD

    LIKE

    LOVE

    MEH

    NORMAL
  }

  enum ApiBlackCardPickChoices {
    PICK_ONE

    PICK_THREE

    PICK_TWO
  }

  enum ApiGameStatusChoices {
    AWAITING_CZAR_ANSWERS

    AWAITING_CZAR_QUESTION

    AWAITING_PLAYERS

    AWAITING_PLAYER_ANSWERS

    GAME_CANCELED

    GAME_ENDED

    GAME_STARTED

    SHOW_ROUND_RESULT
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

  enum ApiProfileAvatarChoices {
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

  enum ApiProfileGenderChoices {
    FEMALE

    MALE

    OTHER
  }

  enum ApiProviderConversionModeChoices {
    CREATED

    INVITED

    SUPERUSER
  }

  enum ApiProviderProviderChoices {
    EMAIL

    FACEBOOK

    GOOGLE

    INSTAGRAM

    TWITTER
  }

  enum ApiQuestionRatingChoices {
    BAD

    LIKE

    LOVE

    MEH

    NORMAL
  }

  type AvailableAnswerNode implements Node {
    card: WhiteCardNode!
    createdAt: DateTime!
    game: GameNode!

    id: ID!

    round: Int!
    updatedAt: DateTime!
  }

  type AvailableAnswerNodeConnection {
    edgeCount: Int

    edges: [AvailableAnswerNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type AvailableAnswerNodeEdge {
    cursor: String!

    node: AvailableAnswerNode
  }

  type AvailableQuestionNode implements Node {
    card: BlackCardNode!
    createdAt: DateTime!
    game: GameNode!

    id: ID!

    round: Int!
    updatedAt: DateTime!
  }

  type AvailableQuestionNodeConnection {
    edgeCount: Int

    edges: [AvailableQuestionNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type AvailableQuestionNodeEdge {
    cursor: String!

    node: AvailableQuestionNode
  }

  input BatchCreateInviteInput {
    email: String!
    game: ID!
    revoked: Boolean
    spectator: Boolean
  }

  type BlackCardNode implements Node {
    answerSet(
      after: String
      before: String
      card: ID
      createdAt: DateTime
      first: Int
      game: ID
      last: Int
      offset: Int
      player: ID
      question: ID
      rating: String
      round: Int
      selected: Boolean
      updatedAt: DateTime
    ): AnswerNodeConnection!
    availablequestionSet(
      after: String
      before: String
      card: ID
      createdAt: DateTime
      first: Int
      game: ID
      last: Int
      offset: Int
      round: Int
      updatedAt: DateTime
    ): AvailableQuestionNodeConnection!
    createdAt: DateTime!
    genre: GenreNode!

    id: ID!
    pick: ApiBlackCardPickChoices!
    questionSet(
      after: String
      before: String
      card: ID
      createdAt: DateTime
      first: Int
      game: ID
      last: Int
      offset: Int
      player: ID
      rating: String
      round: Int
      updatedAt: DateTime
    ): QuestionNodeConnection!
    rating: CardRating

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

  enum CardRating {
    BAD
    LIKE
    LOVE
    MEH
    NORMAL
  }

  input ChatInput {
    message: String!
    room: ID!
    sender: ID!
  }

  type ChatNode {
    message: String!
    room: ID!
    sender: ID!
  }

  type ChatSubscription {
    chat(input: ChatInput!): ChatNode
  }

  input CreateGameInput {
    answerSet: [ID]
    availableanswerSet: [ID]
    availablequestionSet: [ID]
    genres: [ID]!

    joinEndsAt: DateTime

    numPlayers: Int

    numSpectators: Int
    playerSetAdd: [CreateGameInputAddGamePlayerset]
    private: Boolean
    questionSet: [ID]

    round: Int

    roundTime: Int

    rounds: Int
    task: ID
  }

  input CreateGameInputAddGamePlayerset {
    answerSet: [ID]
    avatar: ApiPlayerAvatarChoices
    questionSet: [ID]
    spectator: Boolean
    user: ID!
    winner: [ID]
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

  scalar Date

  scalar DateTime

  input DeleteRefreshTokenCookieInput {
    clientMutationId: String
  }

  type DeleteRefreshTokenCookiePayload {
    clientMutationId: String
    deleted: Boolean!
  }

  type GameInProgressSubscription {
    gameInProgress: GameNode
  }

  type GameInviteMutation {
    invites: [InviteNode]
  }

  type GameNode implements Node {
    answers: [AnswerNode]
    availableAnswers: [AvailableAnswerNode]
    availableQuestions: [AvailableQuestionNode]
    createdAt: DateTime!
    creator: UserNode!
    czarAnswers: [AnswerNode]
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
    inviteSet(
      after: String
      before: String
      createdAt: DateTime
      email: String
      first: Int
      game: ID
      last: Int
      offset: Int
      revoked: Boolean
      spectator: Boolean
      updatedAt: DateTime
    ): InviteNodeConnection!

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
    private: Boolean!
    question: QuestionNode

    round: Int!

    roundTime: Int!

    rounds: Int!
    status: ApiGameStatusChoices!
    updatedAt: DateTime!
    userAnswers: [AnswerNode]
    winner: PlayerNode
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

  type GamePrivacyMutation {
    game: GameNode
  }

  type GameStatusMutation {
    game: GameNode
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
      creator: ID
      first: Int
      genres: [ID]
      joinEndsAt: DateTime
      last: Int
      numPlayers: Int
      numSpectators: Int
      offset: Int
      private: Boolean
      round: Int
      roundTime: Int
      rounds: Int
      status: String
      task: ID
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

  type InviteNode implements Node {
    createdAt: DateTime!
    email: String!
    game: GameNode!

    id: ID!
    revoked: Boolean!
    spectator: Boolean!
    updatedAt: DateTime!
  }

  type InviteNodeConnection {
    edgeCount: Int

    edges: [InviteNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type InviteNodeEdge {
    cursor: String!

    node: InviteNode
  }

  input InvitedGameInput {
    email: String!
    id: ID!
  }

  type JWTPayloadNode {
    aud: String
    avatar: String
    email: String
    emailVerified: Boolean
    exp: Int
    iat: Int
    iss: String
    jti: String
    name: String
    nbf: Int
    provider: String
    sub: String
    username: String
  }

  type JoinGameMutation {
    game: GameNode
    ok: Boolean
  }

  input JoinGameMutationInput {
    avatar: String!
    game: ID!
    spectator: Boolean
  }

  type Mutation {
    createGame(input: CreateGameInput!): CreateGameMutation
    createNewGame(input: CreateGameMutationInput!): CreateNewGameMutation
    createUser(input: CreateUserMutationInput!): CreateUserMutation
    deleteRefreshTokenCookie(input: DeleteRefreshTokenCookieInput!): DeleteRefreshTokenCookiePayload
    gameInvitation(input: [BatchCreateInviteInput]!): GameInviteMutation
    gamePrivacy(id: ID!, input: UpdateGamePrivacyInput!): GamePrivacyMutation
    gameStatus(id: ID!, input: UpdateGameStatusInput!): GameStatusMutation
    joinGame(input: JoinGameMutationInput!): JoinGameMutation
    refreshToken(input: RefreshTokenMutationInput!): RefreshTokenMutationPayload
    revokeRefreshToken(input: RevokeInput!): RevokePayload
    roundCzarAnswers(input: RoundCzarAnswersMutationInput!): RoundCzarAnswersMutation
    roundPlayerAnswers(input: RoundPlayerAnswersMutationInput!): RoundPlayerAnswersMutation
    roundQuestion(input: RoundQuestionMutationInput!): RoundQuestionMutation
    setFullWidth(input: SetFullWidthMutationInput!): SetFullWidthMutation

    socialAuth(input: SocialAuthJWTInput!): SocialAuthJWTPayload
    toggleNav: ToggleNavMutation
    tokenAuth(input: ObtainJSONWebTokenMutationInput!): ObtainJSONWebTokenMutationPayload
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

  type NotificationNode {
    id: ID!

    invites(after: String, before: String, email: String, first: Int, last: Int, offset: Int, revoked: Boolean): InviteNodeConnection
  }

  type NotificationSubscription {
    notifications: NotificationNode
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
    answerSet(
      after: String
      before: String
      card: ID
      createdAt: DateTime
      first: Int
      game: ID
      last: Int
      offset: Int
      player: ID
      question: ID
      rating: String
      round: Int
      selected: Boolean
      updatedAt: DateTime
    ): AnswerNodeConnection!
    avatar: ApiPlayerAvatarChoices!
    createdAt: DateTime!
    czar: Boolean!
    game: GameNode!

    id: ID!
    questionSet(
      after: String
      before: String
      card: ID
      createdAt: DateTime
      first: Int
      game: ID
      last: Int
      offset: Int
      player: ID
      rating: String
      round: Int
      updatedAt: DateTime
    ): QuestionNodeConnection!
    score: Int!
    spectator: Boolean!
    updatedAt: DateTime!
    user: UserNode!
    winner(
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
      private: Boolean
      round: Int
      roundTime: Int
      rounds: Int
      status: String
      task: ID
      updatedAt: DateTime
      winner: ID
    ): GameNodeConnection!
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

  type ProfileNode implements Node {
    avatar: ApiProfileAvatarChoices
    createdAt: DateTime!

    dateOfBirth: Date

    firstName: String!

    gender: ApiProfileGenderChoices

    id: ID!

    lastName: String!
    provider: ProviderNode!
    updatedAt: DateTime!

    username: String!
  }

  type ProviderNode implements Node {
    conversionMode: ApiProviderConversionModeChoices!
    createdAt: DateTime!
    email: String!

    id: ID!
    lastLogin: DateTime
    lastLogout: DateTime
    phone: String
    primary: Boolean!
    profile: ProfileNode

    provider: ApiProviderProviderChoices!
    seed: String
    updatedAt: DateTime!
    user: UserNode!

    verifiedAt: DateTime
  }

  type ProviderNodeConnection {
    edgeCount: Int

    edges: [ProviderNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type ProviderNodeEdge {
    cursor: String!

    node: ProviderNode
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

    fullWidth: Boolean
    gameInProgress: GameNode

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
      private: Boolean
      round: Int
      roundTime: Int
      rounds: Int
      status: String
      task: ID
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
    invitedGame(input: InvitedGameInput!): GameNode

    navOpen: Boolean
    newGame(id: ID!): NewGameNode
    notifications: NotificationNode

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

  type QuestionNode implements Node {
    card: BlackCardNode!
    createdAt: DateTime!
    game: GameNode!

    id: ID!
    player: PlayerNode!
    rating: ApiQuestionRatingChoices!

    round: Int!
    updatedAt: DateTime!
  }

  type QuestionNodeConnection {
    edgeCount: Int

    edges: [QuestionNodeEdge]!

    pageInfo: PageInfo!
    totalCount: Int
  }

  type QuestionNodeEdge {
    cursor: String!

    node: QuestionNode
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

  input RoundCardInput {
    id: ID!
    rating: CardRating!
  }

  type RoundCzarAnswersMutation {
    ok: Boolean
  }

  input RoundCzarAnswersMutationInput {
    cards: [RoundCardInput]!
  }

  type RoundPlayerAnswersMutation {
    ok: Boolean
  }

  input RoundPlayerAnswersMutationInput {
    cards: [RoundCardInput]!
    game: ID!
    player: ID!
    question: ID!
    round: Int!
  }

  type RoundQuestionMutation {
    ok: Boolean
  }

  input RoundQuestionMutationInput {
    card: ID!
    game: ID!
    player: ID!
    rating: CardRating!
    round: Int!
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
    chat: ChatSubscription
    gameInProgress: GameInProgressSubscription
    notifications: NotificationSubscription
  }

  type ToggleNavMutation {
    navOpen: Boolean
  }

  input UpdateGamePrivacyInput {
    private: Boolean!
  }

  input UpdateGameStatusInput {
    status: ApiGameStatusChoices!
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
      private: Boolean
      round: Int
      roundTime: Int
      rounds: Int
      status: String
      task: ID
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
    providerSet(
      after: String
      before: String
      conversionMode: String
      createdAt: DateTime
      email: String
      first: Int
      last: Int
      lastLogin: DateTime
      lastLogout: DateTime
      offset: Int
      phone: String
      primary: Boolean
      provider: String
      seed: String
      updatedAt: DateTime
      user: ID
      verifiedAt: DateTime
    ): ProviderNodeConnection!
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
    answerSet(
      after: String
      before: String
      card: ID
      createdAt: DateTime
      first: Int
      game: ID
      last: Int
      offset: Int
      player: ID
      question: ID
      rating: String
      round: Int
      selected: Boolean
      updatedAt: DateTime
    ): AnswerNodeConnection!
    availableanswerSet(
      after: String
      before: String
      card: ID
      createdAt: DateTime
      first: Int
      game: ID
      last: Int
      offset: Int
      round: Int
      updatedAt: DateTime
    ): AvailableAnswerNodeConnection!
    createdAt: DateTime!
    genre: GenreNode!

    id: ID!
    rating: CardRating

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
