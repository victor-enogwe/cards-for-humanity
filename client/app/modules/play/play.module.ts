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
import { CountdownTimerComponent } from '../../components/shared/countdown-timer/countdown-timer.component';
import { GameToolbarComponent } from '../../components/shared/game-toolbar/game-toolbar.component';
import { GenreComponent } from '../../components/shared/genre/genre.component';
import { InviteComponent } from '../../components/shared/invite/invite.component';
import { GameInProgressGuard } from '../../guards/game-in-progress/game-in-progress.guard';
import { GameNotInProgressGuard } from '../../guards/game-not-in-progress/game-not-in-progress.guard';
import { LobbyGuard } from '../../guards/lobby/lobby.guard';
import { PlayGuard } from '../../guards/play/play.guard';
import { SelectAvatarGuard } from '../../guards/select-avatar/select-avatar.guard';
import { SharedModule } from '../../modules/shared/shared.module';
import { GameInProgressResolver } from '../../resolvers/game-in-progress/game-in-progress.resolver';
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
      { path: 'join-game', component: JoinGameComponent, canActivate: [PlayGuard] },
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
    CountdownTimerComponent,
    GameToolbarComponent,
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
    NewGameResolver,
    GameInProgressResolver,
  ],
})
export class PlayModule {}
