import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, lastValueFrom, of, Subscription } from 'rxjs';
import { finalize, mergeMap, tap } from 'rxjs/operators';
import { AuthUser } from '../../../@types/global';
import { AuthService } from '../../../services/auth/auth.service';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'cah-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  rememberCookie = 'CAH_RM';
  showPassword = false;
  user = this.authService.decodeObject(this.cookieService.get(this.rememberCookie)) as AuthUser;
  isMobile = new BehaviorSubject<boolean>(false);
  showSocialAuth = false;
  breakpointSubscription!: Subscription;
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
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe('(max-width: 992px)')
      .subscribe(({ matches }) => this.isMobile.next(matches));
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }

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
