import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../modules/shared/shared.module'

// components
import { PlayComponent } from '../../components/play/play.component'
import { GenreComponent } from '../../components/genre/genre.component'
import { GenresComponent } from '../../components/genres/genres.component'

// export routes to enable AOT compile route data
export const routes: Routes = [{ path: '', component: PlayComponent }]

@NgModule({
  declarations: [PlayComponent, GenreComponent, GenresComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PlayModule { }
