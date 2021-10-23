import { gql } from 'client/app/utils/gql';

export const GAME_SUBSCRIPTION = gql`
  subscription {
    gameSubscription {
      __typename
    }
  }
`;
