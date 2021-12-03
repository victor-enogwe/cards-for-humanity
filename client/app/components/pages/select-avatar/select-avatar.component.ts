import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Avatar, PlayType } from '../../../@types/global';

@Component({
  selector: 'cah-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAvatarComponent {
  avatar?: Avatar['name'] = this.route.snapshot.data?.newGame?.avatar;
  playType: PlayType = this.router.getCurrentNavigation()?.extras.state?.playType;

  constructor(public route: ActivatedRoute, private router: Router) {}

  selectAvatar(avatar?: Avatar | null) {
    this.avatar = avatar?.name;
  }
}
