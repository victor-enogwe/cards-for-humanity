import { ChangeDetectionStrategy, Component } from '@angular/core';
import { iif, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'cah-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {
  notifications$ = this.authService.profile$
    .asObservable()
    .pipe(
      switchMap((profile) =>
        iif(
          () => Boolean(profile?.email),
          this.notificationService.fetchNotifications(profile?.email!).valueChanges.pipe(map(({ data }) => data.notifications)),
          of(),
        ),
      ),
    );

  constructor(private notificationService: NotificationService, private authService: AuthService) {}
}
