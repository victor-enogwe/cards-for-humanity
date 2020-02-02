import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../modules/shared/shared.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

// components
import { AuthComponent } from '../../components/auth/auth.component'
import { LoginComponent } from '../../components/login/login.component'
import { RegisterComponent } from '../../components/register/register.component'
import { ResetPasswordComponent } from '../../components/reset-password/reset-password.component'
import { AuthContainerComponent } from '../../components/auth-container/auth-container.component'

// utils
import { login } from '../../utils/seo'

// services
import { FormService } from '../../services/form/form.service'

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, data: { seo: login } },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password', component: ResetPasswordComponent }
    ]
  }
]

@NgModule({
  declarations: [AuthComponent, AuthContainerComponent, LoginComponent, RegisterComponent, ResetPasswordComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [FormService]
})
export class AuthModule { }
