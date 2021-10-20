import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GenresComponent } from '../../components/shared/genres/genres.component'
import { PlayComponent } from '../../components/pages/play/play.component'
import { GenreComponent } from '../../components/shared/genre/genre.component'
import { SharedModule } from '../../modules/shared/shared.module';
import { CarouselModule } from 'ngx-carousel-lib'
import { OptionsComponent } from '../../components/pages/options/options.component'


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
  declarations: [PlayComponent, GenreComponent, GenresComponent, OptionsComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CarouselModule
  ]
})
export class PlayModule { }
