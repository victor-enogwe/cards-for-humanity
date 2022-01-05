import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { iif, map, of, Subscription, switchMap } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'cfh-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit, OnDestroy {
  profileSubscription!: Subscription;
  notificationUnSubscribe: Subscription['unsubscribe'] = () => undefined;
  notifications$ = this.authService.profile$
    .asObservable()
    .pipe(
      switchMap((profile) =>
        iif(
          () => Boolean(profile?.email),
          this.notificationService.watchNotifications(profile?.email!).valueChanges.pipe(map(({ data }) => data.notifications)),
          of(),
        ),
      ),
    );

  constructor(private notificationService: NotificationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.profileSubscription = this.authService.profile$
      .asObservable()
      .pipe(
        map((profile) =>
          iif(() => Boolean(profile?.email), this.notificationSubscription(profile?.email!), of(this.notificationUnSubscribe())),
        ),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
    this.notificationUnSubscribe();
  }

  notificationSubscription(email: string) {
    this.notificationUnSubscribe = this.notificationService.notificationsSubscription(email);
    return of(this.notificationUnSubscribe);
  }
}
