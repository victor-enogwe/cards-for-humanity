import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Maybe, PlayerNode, PlayerNodeEdge } from '../../../@types/graphql';
import { AuthService } from '../../../services/auth/auth.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cfh-players-small',
  templateUrl: './players-small.component.html',
  styleUrls: ['./players-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersSmallComponent {
  @Input() players?: readonly Maybe<PlayerNodeEdge>[];
  @Input() czar?: Maybe<PlayerNode>;
  avatars = this.uiService.avatarMemo;
  userId = this.authService.profile$.getValue()?.sub;
  isMobile$ = this.uiService.isMobile$;

  constructor(private uiService: UIService, private authService: AuthService) {}
}
