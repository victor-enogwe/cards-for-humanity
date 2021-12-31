import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ApiGameStatusChoices, GameNode } from '../../../@types/graphql';
import { APP_HOST } from '../../../modules/cah/cah.module';
import { NotificationService } from '../../../services/notification/notification.service';
import { UIService } from '../../../services/ui/ui.service';
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
  navOpen$ = this.uiService.navOpen$;
  timers: { [key in ApiGameStatusChoices]?: number } = {
    GAC: 10,
  };

  constructor(@Inject(APP_HOST) public host: string, private notificationService: NotificationService, private uiService: UIService) {}

  copied() {
    return this.notificationService.notify('invite link copied to clipboard', 'success');
  }

  canJoin(game: GameNode) {
    return new Date(game.joinEndsAt).getTime() > new Date(Date.now()).getTime();
  }

  genresToString(game: GameNode) {
    return game.genres.edges.map((genre) => genre?.node?.description).join(', ');
  }
}
