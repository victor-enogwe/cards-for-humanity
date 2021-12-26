import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, lastValueFrom, map, share, Subscription, tap } from 'rxjs';
import { MatFabMenu } from '../../../@types/global';
import { GameNode, Maybe } from '../../../@types/graphql';
import { AuthService } from '../../../services/auth/auth.service';
import { GameService } from '../../../services/game/game.service';
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

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private gameService: GameService) {}

  ngOnInit(): void {
    this.route.data
      .pipe(first())
      .pipe(tap(({ gameInProgress: game }) => this.fabMenu(game)))
      .subscribe();
    this.gameInProgressUnsubscribe = this.gameService.gameInProgressSubscription(this.fabMenu.bind(this));
  }

  ngOnDestroy(): void {
    this.gameInProgressUnsubscribe();
  }

  isCreator(game: Maybe<GameNode>) {
    return this.gameService.isCreator(game);
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
        id: 'start_game',
        icon: 'play_arrow',
        tooltip: 'Start Game',
        tooltipPosition: 'left',
        color: 'success',
        directives: {
          cahConfirmDialog: {
            config: { data: { title: `Start Game`, description: game.id } },
            confirmClick: () => lastValueFrom(this.gameService.updateGameStatus(game.id, { status: 'GAME_STARTED' })),
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
          cahDialogComponent: {
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
          cahDialogComponent: {
            component: InviteComponent,
            config: { data: { game: game, inviteOnly: game.private }, maxHeight: '420px' },
          },
        },
      },
      {
        id: 'chat',
        icon: 'chat',
        tooltip: 'chat',
        tooltipPosition: 'left',
        color: 'accent',
        directives: {},
      },
    ];

    const canJoin = new Date(game.joinEndsAt).getTime() > new Date(Date.now()).getTime();

    this.fab = menus.filter(({ id }) => {
      switch (id) {
        case 'invite_players':
          return game.numPlayers < 2 && canJoin;
        case 'invite_spectators':
          return game.numSpectators < 1 && canJoin;
        case 'cancel_game':
          return this.authService.profile$.getValue()?.sub !== game.creator.id;
        case 'start_game':
          return !canJoin;
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
