import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NewGameNode } from '../../../@types/graphql';
import { APP_HOST } from '../../../modules/cah/cah.module';
import { NotificationService } from '../../../services/notification/notification.service';
import { QrCodeComponent } from '../qr-code/qr-code.component';

@Component({
  selector: 'cah-link-share',
  templateUrl: './link-share.component.html',
  styleUrls: ['./link-share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkShareComponent {
  @Input() game!: NewGameNode;
  @Output() inviteOnly: EventEmitter<MatSlideToggleChange> = new EventEmitter<MatSlideToggleChange>();
  qrCodeComponent = QrCodeComponent;

  constructor(@Inject(APP_HOST) public host: string, private notificationService: NotificationService) {}

  copied() {
    return this.notificationService.notify('invite link copied to clipboard', 'success');
  }
}
