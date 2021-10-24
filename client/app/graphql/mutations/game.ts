import { gql } from 'client/app/utils/gql';
import { GAME_NODE_FRAGMENT, NEW_GAME_NODE_FRAGMENT } from '../fragments';

export const CREATE_GAME_MUTATION = gql`
  ${GAME_NODE_FRAGMENT}

  mutation CreateGame($input: CreateGameInput!) {
    createGame(input: $input) {
      game {
        ...GameNode
      }
    }
  }
`;

export const CREATE_GAME_LOCAL_MUTATION = gql`
  ${NEW_GAME_NODE_FRAGMENT}

  mutation CreateGameLocal($input: CreateGameInput!) {
    createNewGame(input: $input) @client {
      newGame @client {
        ...NewGameNode
      }
    }
  }
`;
