import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// components
import { HomeComponent } from '../..//components/home/home.component'
import { SharedModule } from '../..//modules/shared/shared.module'

// export routes to enable AOT compile route data
export const routes: Routes = [{ path: '', component: HomeComponent }]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
