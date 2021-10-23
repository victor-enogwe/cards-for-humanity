import { TypePolicies } from '@apollo/client/core'

export const typePolicies: TypePolicies = {
  GenreNode: {
    fields: {
      selected: {
        read: (value = false) => value
      }
    }
  },
  // RootMutation: {
  //   fields: {
  //     createGameLocal: {
  //       read
  //     }
  //   },
  // }
}
