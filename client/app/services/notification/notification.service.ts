import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import { Query } from '../../@types/graphql';
import { NOTIFICATIONS_QUERY } from '../../graphql';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar, private apollo: Apollo) {}

  async notify(message: string, action: string, config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, { duration: 3000, ...config });
  }

  fetchNotifications(email: string) {
    return this.apollo.watchQuery<Pick<Query, 'notifications'>>({
      query: NOTIFICATIONS_QUERY,
      variables: { email },
      fetchPolicy: 'network-only',
    });
  }

  // fetchNotificationsSubscription(email: string) {
  //   return this.fetchNotifications(email).subscribeToMore({
  //     document: 'NOTIFICATIONS_SUBSCRIPTION',
  //     updateQuery: (prev, { subscriptionData }) => {
  //       return subscriptionData.data;
  //     },
  //   });
  // }
}
