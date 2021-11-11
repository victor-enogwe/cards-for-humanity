import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from '../../components/pages/lobby/lobby.component';
import { OptionsComponent } from '../../components/pages/options/options.component';
import { PlayComponent } from '../../components/pages/play/play.component';
import { GenreComponent } from '../../components/shared/genre/genre.component';
import { InviteComponent } from '../../components/shared/invite/invite.component';
import { LobbyGuard } from '../../guards/lobby/lobby.guard';
import { SharedModule } from '../../modules/shared/shared.module';
import { NewGameResolver } from '../../resolvers/newGame/new-game.resolver';
import { GameService } from '../../services/game/game.service';
import { GenreService } from '../../services/genre/genre.service';
import { LinkShareComponent } from '../../components/shared/link-share/link-share.component';
import { AvatarComponent } from '../../components/shared/avatar/avatar.component';
import { AvailableGamesComponent } from '../../components/shared/available-games/available-games.component';

const routes: Routes = [
  {
    path: '',
    component: PlayComponent,
    children: [
      { path: 'options', component: OptionsComponent },
      { path: 'lobby', component: LobbyComponent, resolve: { newGame: NewGameResolver } },
      { path: '', redirectTo: 'options', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    PlayComponent,
    GenreComponent,
    OptionsComponent,
    LobbyComponent,
    InviteComponent,
    LinkShareComponent,
    AvatarComponent,
    AvailableGamesComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [GenreService, GameService, LobbyGuard],
})
export class PlayModule {}
