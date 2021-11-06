import { gql } from '../../utils/gql';

export const IS_LOGGED_IN_QUERY = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

export const PROFILE_QUERY = gql`
  query Profile {
    profile @client {
      username
    }
  }
`;
