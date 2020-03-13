import { SocialUser } from 'angularx-social-login'

/**
 * resolve User
 *
 * @export
 * @param {*} _
 * @param {SocialUser} user
 * @param {*} { cache }
 * @returns
 */
export function CurrentUser(_, user: SocialUser, { cache }) {
  const data = {
    User: {
      __typename: 'User',
      ...user
    }
  }

  cache.writeData({ data })

  return data
}

/**
 * token auth resolver
 *
 * @export
 * @param {*} _
 * @param {*}
 * @param {*} { cache }
 * @returns
 */
export function tokenAuth(_, auth, { cache }) {
  const data = {
    tokenAuth: {
      __typename: 'ObtainJSONWebTokenPayload!',
      ...auth
    }
  }
  console.log(auth)

  cache.writeData({ data })

  return data
}

export const resolvers = {
  Mutation: {
    CurrentUser,
    // tokenAuth
  }
}
