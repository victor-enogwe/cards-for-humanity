import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GameNode } from '../../../@types/graphql';
import { APP_HOST } from '../../../modules/cah/cah.module';
import { NotificationService } from '../../../services/notification/notification.service';
import { QRCodeComponent } from '../qr-code/qr-code.component';
@Component({
  selector: 'cah-game-toolbar',
  templateUrl: './game-toolbar.component.html',
  styleUrls: ['./game-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameToolbarComponent {
  @Input() game!: GameNode;
  @Output() inviteOnly: EventEmitter<MatSlideToggleChange> = new EventEmitter<MatSlideToggleChange>();
  qrCodeComponent = QRCodeComponent;

  constructor(@Inject(APP_HOST) public host: string, private notificationService: NotificationService) {}

  copied() {
    return this.notificationService.notify('invite link copied to clipboard', 'success');
  }
}
