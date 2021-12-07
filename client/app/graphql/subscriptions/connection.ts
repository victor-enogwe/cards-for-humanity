import { gql } from '../../utils/gql';

export const CONNECT_SUBSCRIPTION = gql`
  subscription Connect($room: ID!) {
    connect(room: $room) {
      __typename
      room
      ok
      message
    }
  }
`;
