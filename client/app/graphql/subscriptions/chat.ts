import { gql } from '../../utils/gql';

export const CONNECT_SUBSCRIPTION = gql`
  subscription Connect($input: ChatInput!) {
    chat(input: $input) {
      chat {
        __typename
        room
        ok
        message
      }
    }
  }
`;
