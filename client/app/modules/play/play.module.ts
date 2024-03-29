import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from '../../components/pages/create-game/create-game.component';
import { JoinGameComponent } from '../../components/pages/join-game/join-game.component';
import { LobbyComponent } from '../../components/pages/lobby/lobby.component';
import { PlayTypeComponent } from '../../components/pages/play-type/play-type.component';
import { PlayComponent } from '../../components/pages/play/play.component';
import { SelectAvatarComponent } from '../../components/pages/select-avatar/select-avatar.component';
import { AvailableGamesComponent } from '../../components/shared/available-games/available-games.component';
import { AvatarComponent } from '../../components/shared/avatar/avatar.component';
import { CardDeckComponent } from '../../components/shared/card-deck/card-deck.component';
import { GameScreenComponent } from '../../components/shared/game-screen/game-screen.component';
import { GameToolbarComponent } from '../../components/shared/game-toolbar/game-toolbar.component';
import { GenreComponent } from '../../components/shared/genre/genre.component';
import { InviteComponent } from '../../components/shared/invite/invite.component';
import { PlayersSmallComponent } from '../../components/shared/players-small/players-small.component';
import { PlayersComponent } from '../../components/shared/players/players.component';
import { GameInProgressGuard } from '../../guards/game-in-progress/game-in-progress.guard';
import { GameNotInProgressGuard } from '../../guards/game-not-in-progress/game-not-in-progress.guard';
import { GameStartedGuard } from '../../guards/game-started/game-started.guard';
import { InvitedGuard } from '../../guards/invited/invited.guard';
import { LobbyGuard } from '../../guards/lobby/lobby.guard';
import { PlayGuard } from '../../guards/play/play.guard';
import { SelectAvatarGuard } from '../../guards/select-avatar/select-avatar.guard';
import { SharedModule } from '../../modules/shared/shared.module';
import { GameInProgressResolver } from '../../resolvers/game-in-progress/game-in-progress.resolver';
import { GameResolver } from '../../resolvers/game/game.resolver';
import { NewGameResolver } from '../../resolvers/newGame/new-game.resolver';
import { GameService } from '../../services/game/game.service';
import { GenreService } from '../../services/genre/genre.service';

const routes: Routes = [
  {
    path: '',
    component: PlayComponent,
    children: [
      { path: '', component: PlayTypeComponent, canActivate: [GameNotInProgressGuard] },
      {
        path: 'select-avatar',
        component: SelectAvatarComponent,
        canActivate: [GameNotInProgressGuard, SelectAvatarGuard],
        resolve: { newGame: NewGameResolver },
      },
      {
        path: 'create-game',
        component: CreateGameComponent,
        canActivate: [GameNotInProgressGuard, PlayGuard],
        resolve: { newGame: NewGameResolver },
      },
      { path: 'join-game', component: AvailableGamesComponent, canActivate: [PlayGuard] },
      {
        path: 'join-game/:gameId',
        component: JoinGameComponent,
        canActivate: [InvitedGuard, GameStartedGuard],
        resolve: { game: GameResolver },
      },
      {
        path: 'lobby',
        component: LobbyComponent,
        canActivate: [GameInProgressGuard],
        resolve: { gameInProgress: GameInProgressResolver },
      },
    ],
  },
];

@NgModule({
  declarations: [
    PlayComponent,
    PlayTypeComponent,
    GenreComponent,
    LobbyComponent,
    InviteComponent,
    GameToolbarComponent,
    AvatarComponent,
    AvailableGamesComponent,
    SelectAvatarComponent,
    CreateGameComponent,
    JoinGameComponent,
    GameToolbarComponent,
    PlayersComponent,
    GameScreenComponent,
    PlayersSmallComponent,
    CardDeckComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [
    GenreService,
    GameService,
    LobbyGuard,
    SelectAvatarGuard,
    PlayGuard,
    GameInProgressGuard,
    GameNotInProgressGuard,
    InvitedGuard,
    GameStartedGuard,
    NewGameResolver,
    GameResolver,
    GameInProgressResolver,
  ],
})
export class PlayModule {}
