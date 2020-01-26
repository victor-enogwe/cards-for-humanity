import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

// components
import { PlayComponent } from 'client/app/components/play/play.component'

const routes: Routes = [{ path: '', component: PlayComponent }]

@NgModule({
  declarations: [PlayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PlayModule { }
