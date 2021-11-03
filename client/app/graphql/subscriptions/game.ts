import { gql } from '../../utils/gql';

export const GAME_SUBSCRIPTION = gql`
  subscription {
    gameSubscription {
      __typename
    }
  }
`;
