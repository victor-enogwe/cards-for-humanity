import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, of } from 'rxjs';
import { finalize, mergeMap, tap } from 'rxjs/operators';
import { AuthUser } from '../../../@types/global';
import { AuthService } from '../../../services/auth/auth.service';
import { FormService } from '../../../services/form/form.service';
import { UIService } from '../../../services/ui/ui.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'cah-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  showPassword = false;
  isMobile$ = this.uiService.isMobile$;
  showSocialAuth = false;
  loginSocial = this.authService.signUpSocial;
  fieldHasError = this.formService.fieldHasError;
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, this.formService.validateUser]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router,
    private uiService: UIService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.restoreRememberedUser();
    const decodedUser = await this.utilsService.decode<AuthUser>(this.authService.cookie$.getValue(), 5);
    this.loginForm.setValue({ username: '', password: '', remember: false, ...decodedUser });
  }

  async loginManual(form: FormGroup) {
    return lastValueFrom(
      of(form).pipe(
        tap(() => form.disable()),
        mergeMap(({ value: { username, password } }) => this.authService.signInManual({ username, password })),
        tap(() => this.authService),
        tap(({ data }) => this.authService.broadcastAuth('login', data?.tokenAuth!)),
        tap(() =>
          this.authService
            .rememberUser(form.value)
            .then(() => this.authService.restoreRememberedUser())
            .then(() => this.router.navigate(['/play'])),
        ),
        finalize(() => form.enable()),
      ),
    );
  }
}
