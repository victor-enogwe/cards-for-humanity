import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GameService } from 'client/app/services/game/game.service'
import { GenreService } from 'client/app/services/genre/genre.service'
import { OptionsComponent } from '../../components/pages/options/options.component'
import { PlayComponent } from '../../components/pages/play/play.component'
import { GenreComponent } from '../../components/shared/genre/genre.component'
import { SharedModule } from '../../modules/shared/shared.module'


const routes: Routes = [
  {
    path: '',
    component: PlayComponent,
    children: [
      { path: 'options', component: OptionsComponent },
      { path: '', redirectTo: 'options', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  declarations: [PlayComponent, GenreComponent, OptionsComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    GenreService,
    GameService
  ]
})
export class PlayModule { }
