import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import { NotificationNode, Query } from '../../@types/graphql';
import { NOTIFICATIONS_QUERY, NOTIFICATIONS_SUBSCRIPTION } from '../../graphql';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar, private apollo: Apollo) {}

  async notify(message: string, action: string, config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, { duration: 3000, ...config });
  }

  watchNotifications(email: string) {
    return this.apollo.watchQuery<Pick<Query, 'notifications'>>({
      query: NOTIFICATIONS_QUERY,
      variables: { email },
      fetchPolicy: 'network-only',
    });
  }

  notificationsSubscription(email: string) {
    return this.watchNotifications(email).subscribeToMore({
      document: NOTIFICATIONS_SUBSCRIPTION,
      variables: { email },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        const { notifications } = subscriptionData.data;
        console.log(notifications);
        if (!notifications) return prev;
        const update: { notifications: NotificationNode } = {
          notifications: {
            ...prev.notifications,
            ...notifications.notifications,
          },
        };
        return update;
      },
    });
  }
}
