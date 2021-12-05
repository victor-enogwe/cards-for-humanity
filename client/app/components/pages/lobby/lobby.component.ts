import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, first, lastValueFrom, map, Observable, tap } from 'rxjs';
import { MatFabMenu } from '../../../@types/global';
import { GameNode } from '../../../@types/graphql';
import { AuthService } from '../../../services/auth/auth.service';
import { GameService } from '../../../services/game/game.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { InviteComponent } from '../../shared/invite/invite.component';

@Component({
  selector: 'cah-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent {
  fab: MatFabMenu[] = [];
  inviteOnly = false;
  inviteComponent = InviteComponent;
  gameId = (this.route.data as BehaviorSubject<{ gameInProgress: GameNode }>).getValue().gameInProgress.id;
  gameInProgress$ = this.route.data.pipe(map((data) => data.gameInProgress as GameNode)).pipe(first());
  gameUpdates$ = this.gameService.subscription(this.gameId).pipe(
    tap(console.log),
    map(({ data }) => data?.game?.game),
  );
  game$: Observable<GameNode> = combineLatest([this.gameInProgress$, this.gameUpdates$]).pipe(
    map(([game, updates]) => ({ ...game, ...updates })),
  );

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private gameService: GameService,
    private utilsService: UtilsService,
  ) {}

  fabMenu({ game, inviteOnly }: { game: GameNode; inviteOnly: boolean }): MatFabMenu[] {
    const menus: MatFabMenu[] = [
      {
        id: 'cancel_game',
        icon: 'cancel',
        tooltip: 'Cancel Game',
        tooltipPosition: 'left',
        color: 'danger',
      },
      {
        id: 'invite_spectators',
        icon: 'rsvp',
        tooltip: 'invite spectators',
        tooltipPosition: 'left',
        color: 'queued',
        directives: {
          cahConfirmDialog: {
            component: InviteComponent,
            config: { data: { game: game, inviteOnly, spectator: true }, maxHeight: '420px' },
          },
        },
      },
      {
        id: 'invite_players',
        icon: 'person_add',
        tooltip: 'invite players',
        tooltipPosition: 'left',
        color: 'warn',
        directives: {
          cahConfirmDialog: {
            component: InviteComponent,
            config: { data: { game: game, inviteOnly }, maxHeight: '420px' },
          },
        },
      },
    ];

    return menus.filter(({ id }) => {
      switch (true) {
        case id === 'invite_players' && game.numPlayers < 2:
        case id === 'invite_spectators' && game.numSpectators < 1:
        case id === 'cancel_game' && Number(this.authService.profile$.getValue()?.sub) !== +this.utilsService.fromRelayID(game.creator.id):
          return false;
        default:
          return true;
      }
    });
  }

  fabItemClicked($event: any) {}

  async setPrivacy({ game, privacy }: { game: GameNode; privacy: boolean }) {
    return lastValueFrom(this.gameService.updateGamePrivacy(game.id, { private: privacy }));
  }
}
