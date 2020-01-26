import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

// components
import { AuthComponent } from 'client/app/components/auth/auth.component'

const routes: Routes = [{ path: '', component: AuthComponent }]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
