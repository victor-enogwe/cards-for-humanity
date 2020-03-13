import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../modules/shared/shared.module'

// components
import { PlayComponent } from '../../components/play/play.component'
import { GenreComponent } from '../../components/genre/genre.component'
import { GenresComponent } from '../../components/genres/genres.component'

// utils
import { play } from '../../utils/seo'
import { FormsModule } from '@angular/forms'

// export routes to enable AOT compile route data
export const routes: Routes = [{ path: '', component: PlayComponent, data: { seo: play } }]

@NgModule({
  declarations: [PlayComponent, GenreComponent, GenresComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class PlayModule { }
