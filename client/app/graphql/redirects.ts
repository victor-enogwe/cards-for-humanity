/**
 * cache redirect socialAuth
 *
 * @export
 * @param {*} _
 * @param {*} args
 * @param {*} { getCacheKey }
 * @returns
 */
export function socialAuth(_, args, { getCacheKey }) {
  return getCacheKey({ __typename: 'ObtainJSONWebTokenPayload' })
}
