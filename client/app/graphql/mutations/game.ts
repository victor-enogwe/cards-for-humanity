import { gql } from '../../utils/gql';
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

  mutation CreateGameLocal($input: CreateGameMutationInput!) {
    createNewGame(input: $input) @client {
      newGame @client {
        ...NewGameNode
      }
    }
  }
`;

export const UPDATE_GAME_STATUS_MUTATION = gql`
  ${GAME_NODE_FRAGMENT}

  mutation GameStatus($id: ID!, $input: UpdateGameStatusInput!) {
    gameStatus(id: $id, input: $input) {
      game {
        ...GameNode
      }
    }
  }
`;

export const UPDATE_GAME_PRIVACY_MUTATION = gql`
  ${GAME_NODE_FRAGMENT}

  mutation GamePrivacy($id: ID!, $input: UpdateGamePrivacyInput!) {
    gamePrivacy(id: $id, input: $input) {
      game {
        ...GameNode
      }
    }
  }
`;

export const INVITE_GAME_PLAYERS_MUTATION = gql`
  mutation GameInvitation($input: [BatchCreateInviteInput]!) {
    gameInvitation(input: $input) {
      invites {
        id
        spectator
      }
    }
  }
`;

export const JOIN_GAME_MUTATION = gql`
  ${GAME_NODE_FRAGMENT}

  mutation JoinGame($input: JoinGameMutationInput!) {
    joinGame(input: $input) {
      game {
        ...GameNode
      }
    }
  }
`;

export const ROUND_QUESTION_MUTATION = gql`
  mutation RoundQuestion($input: RoundQuestionMutationInput!) {
    roundQuestion(input: $input) {
      ok
    }
  }
`;

export const ROUND_PLAYER_ANSWERS_MUTATION = gql`
  mutation RoundPlayerAnswers($input: RoundPlayerAnswersMutationInput!) {
    roundPlayerAnswers(input: $input) {
      ok
    }
  }
`;

export const ROUND_CZAR_ANSWERS_MUTATION = gql`
  mutation RoundCzarAnswers($input: RoundCzarAnswersMutationInput!) {
    roundCzarAnswers(input: $input) {
      ok
    }
  }
`;
