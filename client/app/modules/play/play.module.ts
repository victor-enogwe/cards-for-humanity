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
import { GenreComponent } from '../../components/shared/genre/genre.component';
import { InviteComponent } from '../../components/shared/invite/invite.component';
import { LinkShareComponent } from '../../components/shared/link-share/link-share.component';
import { LobbyGuard } from '../../guards/lobby/lobby.guard';
import { PlayGuard } from '../../guards/play/play.guard';
import { SelectAvatarGuard } from '../../guards/select-avatar/select-avatar.guard';
import { SharedModule } from '../../modules/shared/shared.module';
import { NewGameResolver } from '../../resolvers/newGame/new-game.resolver';
import { GameService } from '../../services/game/game.service';
import { GenreService } from '../../services/genre/genre.service';

const routes: Routes = [
  {
    path: '',
    component: PlayComponent,
    children: [
      { path: '', component: PlayTypeComponent },
      { path: 'select-avatar', component: SelectAvatarComponent, canActivate: [SelectAvatarGuard], resolve: { newGame: NewGameResolver } },
      { path: 'join-game', component: JoinGameComponent, canActivate: [PlayGuard] },
      { path: 'create-game', component: CreateGameComponent, canActivate: [PlayGuard], resolve: { newGame: NewGameResolver } },
      { path: 'lobby', component: LobbyComponent, resolve: { newGame: NewGameResolver } },
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
    LinkShareComponent,
    AvatarComponent,
    AvailableGamesComponent,
    SelectAvatarComponent,
    CreateGameComponent,
    JoinGameComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [GenreService, GameService, LobbyGuard, SelectAvatarGuard, PlayGuard, NewGameResolver],
})
export class PlayModule {}
