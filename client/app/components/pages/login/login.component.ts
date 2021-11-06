import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom, of } from 'rxjs';
import { debounceTime, finalize, mergeMap, tap } from 'rxjs/operators';
import { AuthUser } from '../../../@types/global';
import { ObtainJsonWebTokenPayload } from '../../../@types/graphql';
import { AuthService } from '../../../services/auth/auth.service';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'cah-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  rememberCookie = 'CAH_RM';
  showPassword = false;
  user = this.authService.decodeObject(this.cookieService.get(this.rememberCookie)) as AuthUser;
  loginSocial = this.authService.signUpSocial;
  fieldHasError = this.formService.fieldHasError;
  loginForm = this.formBuilder.group({
    username: [this.user.username || '', [Validators.required, this.validateUser]],
    password: [this.user.password || '', [Validators.required]],
    remember: [this.user.remember],
  });

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
  ) {}

  validateUser(usernameControl: AbstractControl): { [key: string]: any } | null {
    const username: string = usernameControl.value;
    const isEmail = username.includes('@');
    return isEmail ? Validators.email(usernameControl) : Validators.required(usernameControl);
  }

  rememberUser(credentials: AuthUser, { payload, token }: ObtainJsonWebTokenPayload) {
    this.authService.auth$.next(token);
    this.authService.profile$.next(payload);
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
        tap(({ data }) => this.rememberUser(form.value, data?.tokenAuth!)),
        debounceTime(1000),
        tap(() => this.router.navigate(['/play'])),
        finalize(() => form.enable()),
      ),
    );
  }
}
