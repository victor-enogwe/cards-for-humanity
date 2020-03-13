export const typeDefs = `
  type User {
    provider: String!
    id: String!
    email: String!
    name: String!
    photoUrl: String!
    firstName: String!
    lastName: String!
    authToken: String!
  }

  type ObtainJSONWebTokenPayload {
    token: String!
  }

  type SocialAuthJWTPayload {
    token: String!
  }
`
