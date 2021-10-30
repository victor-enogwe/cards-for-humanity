import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthComponent } from 'client/app/components/pages/auth/auth.component';
import { ForgotPasswordComponent } from 'client/app/components/pages/forgot-password/forgot-password.component';
import { LoginComponent } from 'client/app/components/pages/login/login.component';
import { RegisterComponent } from 'client/app/components/pages/register/register.component';
import { ResetPasswordComponent } from 'client/app/components/pages/reset-password/reset-password.component';
import { AuthContainerComponent } from 'client/app/components/shared/auth-container/auth-container.component';
import { FormService } from 'client/app/services/form/form.service';
import { login } from 'client/app/utils/seo';
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
