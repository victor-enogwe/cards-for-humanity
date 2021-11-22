import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom, of } from 'rxjs';
import { finalize, map, mergeMap, tap } from 'rxjs/operators';
import { AuthUser } from '../../../@types/global';
import { AuthService } from '../../../services/auth/auth.service';
import { FormService } from '../../../services/form/form.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cah-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  rememberCookie = 'CAH_RM';
  showPassword = false;
  user = this.authService.decodeObject(this.cookieService.get(this.rememberCookie)) as AuthUser;
  isMobile$ = this.uiService.isMobile$.pipe(map((value) => (value ? 'true' : 'false')));
  showSocialAuth = false;
  loginSocial = this.authService.signUpSocial;
  fieldHasError = this.formService.fieldHasError;
  loginForm = this.formBuilder.group({
    username: [this.user.username || '', [Validators.required, this.formService.validateUser]],
    password: [this.user.password || '', [Validators.required]],
    remember: [this.user.remember],
  });

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
    private uiService: UIService,
  ) {}

  rememberUser(credentials: AuthUser) {
    switch (credentials.remember) {
      case true:
        return this.authService.setCookie({
          name: this.rememberCookie,
          value: this.authService.encodeObject(credentials),
          path: '/auth/login',
        });
      default:
        return this.authService.clearCookies('/auth/login');
    }
  }

  async loginManual(form: FormGroup) {
    return lastValueFrom(
      of(form).pipe(
        tap(() => form.disable()),
        mergeMap(({ value: { username, password } }) => this.authService.signInManual({ username, password })),
        tap(() => this.authService),
        tap(({ data }) => this.authService.persistAuth(data?.tokenAuth!)),
        tap(() => this.rememberUser(form.value)),
        tap(() => this.router.navigate(['/play'])),
        finalize(() => form.enable()),
      ),
    );
  }
}
