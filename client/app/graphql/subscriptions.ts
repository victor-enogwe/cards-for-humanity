import gql from 'graphql-tag'

export const gameSubscription = gql`
    subscription {
      gameSubscription(channelId: "5e2bb0415e8b616ea6eb17d7" action: CREATE operation: SUBSCRIBE) {
        stream
        error
        operation
        ok
        action
        __typename
      }
    }
  `
