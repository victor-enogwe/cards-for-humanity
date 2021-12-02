import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Avatar } from '../../../@types/global';

@Component({
  selector: 'cah-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinGameComponent {
  avatar: Avatar = this.router.getCurrentNavigation()?.extras.state?.avatar;

  constructor(private router: Router) {}

  joinGame() {}
}
