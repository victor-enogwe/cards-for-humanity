import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, map, switchMap, tap } from 'rxjs';
import { Avatar } from '../../../@types/global';
import { PlayerNodeEdge } from '../../../@types/graphql';
import { AuthService } from '../../../services/auth/auth.service';
import { GameService } from '../../../services/game/game.service';
import { UIService } from '../../../services/ui/ui.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'cah-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinGameComponent {
  taken$ = this.activatedRoute.data.pipe(map((data) => data.game.playerSet.edges.map((player: PlayerNodeEdge) => player.node?.avatar)));
  avatar?: Avatar = this.uiService.avatars.find(({ name }) => name === this.authService.profile$?.getValue()?.avatar);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uiService: UIService,
    private authService: AuthService,
    private gameService: GameService,
    private utilsService: UtilsService,
  ) {}

  avatarSelected(avatar: Avatar | null | undefined) {
    if (avatar) this.avatar = avatar;
  }

  joinGame() {
    return lastValueFrom(
      this.activatedRoute.data.pipe(
        switchMap((data) =>
          this.gameService.joinGame({
            avatar: this.avatar?.name.toLowerCase()!,
            game: this.utilsService.fromRelayID(data.game.id),
            spectator: false,
          }),
        ),
        tap(() => this.router.navigate(['/play', 'lobby'])),
      ),
    );
  }
}
