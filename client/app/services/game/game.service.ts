import { Injectable } from '@angular/core'
import { Subscription } from 'apollo-angular'
import gql from 'graphql-tag'

@Injectable({
  providedIn: 'root'
})
export class GameService extends Subscription {
  document = gql`
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
}
