import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, lastValueFrom, map, share, Subscription, tap } from 'rxjs';
import { MatFabMenu } from '../../../@types/global';
import { GameNode, Maybe } from '../../../@types/graphql';
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
export class LobbyComponent implements OnInit, OnDestroy {
  fab: MatFabMenu[] = [];
  inviteOnly = false;
  inviteComponent = InviteComponent;
  gameInProgress$ = this.gameService.watchGameInProgress().valueChanges.pipe(
    share(),
    map(({ data }) => data?.gameInProgress),
    tap((game) => this.onGameEnd(game)),
  );
  gameInProgressUnsubscribe!: Subscription['unsubscribe'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private gameService: GameService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(first())
      .pipe(tap(({ gameInProgress: game }) => this.fabMenu(game)))
      .subscribe();
    this.gameInProgressUnsubscribe = this.gameService.gameInProgressSubscription();
  }

  ngOnDestroy(): void {
    this.gameInProgressUnsubscribe();
  }

  fabMenu(game: GameNode) {
    const menus: MatFabMenu[] = [
      {
        id: 'cancel_game',
        icon: 'cancel',
        tooltip: 'Cancel Game',
        tooltipPosition: 'left',
        color: 'danger',
        directives: {
          cahConfirmDialog: {
            config: { data: { title: `Cancel Game`, description: game.id } },
            confirmClick: () => lastValueFrom(this.gameService.updateGameStatus(game.id, { status: 'GAME_ENDED' })),
          },
        },
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
            config: { data: { game: game, inviteOnly: game.private, spectator: true }, maxHeight: '420px' },
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
            config: { data: { game: game, inviteOnly: game.private }, maxHeight: '420px' },
          },
        },
      },
    ];

    this.fab = menus.filter(({ id }) => {
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

  fabItemClicked({ id, game }: { id: 'cancel_game' | 'invite_spectators' | 'invite_players'; game: GameNode }) {}

  async setPrivacy({ game, privacy }: { game: GameNode; privacy: boolean }) {
    this.fabMenu({ ...game, private: privacy });
    return lastValueFrom(this.gameService.updateGamePrivacy(game.id, { private: privacy }));
  }

  async onGameEnd(game?: Maybe<GameNode>): Promise<boolean> {
    if (!game || game?.status === 'GAME_ENDED') return this.router.navigate(['/play']);
    return Promise.resolve(false);
  }
}
