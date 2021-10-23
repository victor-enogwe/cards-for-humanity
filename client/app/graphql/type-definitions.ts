import { gql } from 'client/app/utils/gql'

export const typeDefinitions = gql`
  extend type GenreNode {
    selected: Boolean
  }
  extend type RootMutation {
    newGame: GameNode
  }
`


// extend type RootQuery {
//     newGame: GameNode
//   }

//   extend type MutationM {
//     createGameLocal(
//       id: ID!
//       genres: [ID]!
//       roundTime: Int,
//       rounds: Int,
//       numPlayers: Int!
//       numSpectators: Int!,
//       playerSet: [ID]
//     ): GameNode
//   }
