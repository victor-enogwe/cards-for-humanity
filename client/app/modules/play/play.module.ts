import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from '../../components/pages/options/options.component';
import { PlayComponent } from '../../components/pages/play/play.component';
import { GenreComponent } from '../../components/shared/genre/genre.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { GameService } from '../../services/game/game.service';
import { GenreService } from '../../services/genre/genre.service';

const routes: Routes = [
  {
    path: '',
    component: PlayComponent,
    children: [
      { path: 'options', component: OptionsComponent },
      { path: '', redirectTo: 'options', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [PlayComponent, GenreComponent, OptionsComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [GenreService, GameService],
})
export class PlayModule {}
