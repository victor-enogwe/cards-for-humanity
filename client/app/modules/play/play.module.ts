import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GenresComponent } from '../../components/pages/genres/genres.component'
import { PlayComponent } from '../../components/pages/play/play.component'
import { GenreComponent } from '../../components/shared/genre/genre.component'
import { SharedModule } from '../../modules/shared/shared.module'


const routes: Routes = [
  {
    path: '',
    component: PlayComponent,
    children: [
      { path: 'select-genres', component: GenresComponent },
      { path: '', redirectTo: 'select-genres', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  declarations: [PlayComponent, GenreComponent, GenresComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PlayModule { }
