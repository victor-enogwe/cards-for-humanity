import { gql } from '../../utils/gql';
import { GENRE_NODE_FRAGMENT } from './genre';

export const GAME_NODE_FRAGMENT = gql`
  ${GENRE_NODE_FRAGMENT}

  fragment GameNode on GameNode {
    id
    genres(first: 10) {
      edges {
        node {
          ...GenreNode
        }
        cursor
      }
    }
    roundTime
    rounds
    round
    numPlayers
    numSpectators
    status
    private
    joinEndsAt
    createdAt
    updatedAt
    availableQuestions {
      id
      createdAt
      updatedAt
      round
      game {
        id
        roundTime
        rounds
        round
        numPlayers
        numSpectators
        status
        private
        joinEndsAt
        createdAt
        updatedAt
      }
      card {
        id
        createdAt
        updatedAt
        rating
        text
        pick
        genre {
          description
          credit
        }
      }
    }
    availableAnswers {
      id
      createdAt
      updatedAt
      round
      game {
        id
        roundTime
        rounds
        round
        numPlayers
        numSpectators
        status
        private
        joinEndsAt
        createdAt
        updatedAt
      }
      card {
        id
        createdAt
        updatedAt
        rating
        text
        genre {
          description
          credit
        }
      }
    }
    question {
      id
      createdAt
      updatedAt
      round
      game {
        id
        roundTime
        rounds
        round
        numPlayers
        numSpectators
        status
        private
        joinEndsAt
        createdAt
        updatedAt
      }
      player {
        id
        user {
          id
        }
        czar
      }
      card {
        id
        createdAt
        updatedAt
        rating
        text
        pick
        genre {
          description
          credit
        }
      }
    }
    answers {
      id
      rating
      round
      selected
      card {
        id
        rating
        text
        genre {
          description
          credit
        }
      }
      question {
        id
        rating
        text
        pick
        genre {
          description
          credit
        }
      }
      game {
        id
        roundTime
        rounds
        round
        numPlayers
        numSpectators
        status
        private
        joinEndsAt
        createdAt
        updatedAt
      }
      player {
        id
        czar
        spectator
        avatar
        score
        user {
          id
        }
      }
    }
    czarAnswers {
      id
      rating
      round
      selected
      card {
        id
        rating
        text
        genre {
          description
          credit
        }
      }
      question {
        id
        rating
        text
        pick
        genre {
          description
          credit
        }
      }
      game {
        id
        roundTime
        rounds
        round
        numPlayers
        numSpectators
        status
        private
        joinEndsAt
        createdAt
        updatedAt
      }
      player {
        id
        czar
        spectator
        avatar
        score
        user {
          id
        }
      }
    }
    userAnswers {
      id
      rating
      round
      selected
      card {
        id
        rating
        text
        genre {
          description
          credit
        }
      }
      question {
        id
        rating
        text
        pick
        genre {
          description
          credit
        }
      }
      game {
        id
        roundTime
        rounds
        round
        numPlayers
        numSpectators
        status
        private
        joinEndsAt
        createdAt
        updatedAt
      }
      player {
        id
        czar
        spectator
        avatar
        score
        user {
          id
        }
      }
    }
    creator {
      id
      providerSet(first: 10) {
        edges {
          node {
            profile {
              firstName
              lastName
              avatar
              username
            }
          }
        }
      }
    }
    playerSet(first: 9) {
      edges {
        node {
          id
          czar
          spectator
          avatar
          score
          user {
            id
            providerSet(first: 10) {
              edges {
                node {
                  user {
                    id
                  }
                  email
                  profile {
                    username
                  }
                }
                cursor
              }
            }
          }
        }
        cursor
      }
    }
    inviteSet(first: 10) {
      edges {
        node {
          id
          spectator
          revoked
          email
        }
        cursor
      }
    }
  }
`;

export const NEW_GAME_NODE_FRAGMENT = gql`
  fragment NewGameNode on NewGameNode {
    roundTime @client
    rounds @client
    numPlayers @client
    numSpectators @client
    joinEndsAt @client
    status @client
    genres @client
    avatar @client
  }
`;
