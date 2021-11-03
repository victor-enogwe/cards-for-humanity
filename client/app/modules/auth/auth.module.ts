import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthComponent } from '../../components/pages/auth/auth.component';
import { ForgotPasswordComponent } from '../../components/pages/forgot-password/forgot-password.component';
import { LoginComponent } from '../../components/pages/login/login.component';
import { RegisterComponent } from '../../components/pages/register/register.component';
import { ResetPasswordComponent } from '../../components/pages/reset-password/reset-password.component';
import { AuthContainerComponent } from '../../components/shared/auth-container/auth-container.component';
import { FormService } from '../../services/form/form.service';
import { login } from '../../utils/seo';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, data: { seo: login } },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, AuthContainerComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes), SocialLoginModule],
  providers: [FormService],
})
export class AuthModule {}
