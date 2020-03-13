import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

// components
import { NotFoundComponent } from '../..//components/notfound/notfound.component'

// export routes to enable AOT compile route data
export const routes: Routes = [{ path: '', component: NotFoundComponent }]

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }
