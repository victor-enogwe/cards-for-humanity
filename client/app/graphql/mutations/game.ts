import { gql } from 'client/app/utils/gql'
import { GAME_NODE_FRAGMENT } from '../fragments'

export const CREATE_GAME_MUTATION = gql`
  ${GAME_NODE_FRAGMENT}

  mutation CreateGame(
    $genres: [ID]!,
    $roundTime: Int,
    $rounds: Int,
    $numPlayers: Int!,
    $numSpectators: Int!,
    $playerSet: [ID]
  ) {
    createGame (
      genres: $genres,
      roundTime: $roundTime,
      rounds: $rounds,
      numPlayers: $numPlayers,
      numSpectators: $numSpectators,
      playerSet: $playerSet
    ) {
      ...GameNode
    }
  }
`

export const CREATE_GAME_LOCAL_MUTATION = gql`
  ${GAME_NODE_FRAGMENT}

  mutation CreateGameLocal(
    $id: ID!,
    $genres: [ID]!,
    $roundTime: Int,
    $rounds: Int,
    $numPlayers: Int!,
    $numSpectators: Int!,
    $playerSet: [ID]
  ) {
    createGameLocal @client (
      id: $id,
      genres: $genres,
      roundTime: $roundTime,
      rounds: $rounds,
      numPlayers: $numPlayers,
      numSpectators: $numSpectators,
      playerSet: $playerSet
    ) {
      ...GameNode
    }
  }
`
