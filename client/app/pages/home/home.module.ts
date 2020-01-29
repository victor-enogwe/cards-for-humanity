import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// components
import { HomeComponent } from 'client/app/components/home/home.component'
import { SharedModule } from 'client/app/modules/shared/shared.module'

const routes: Routes = [{ path: '', component: HomeComponent }]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
