import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';
import { FormService } from '../../../services/form/form.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cah-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  signUpSocial = this.authService.signUpSocial;
  showPassword = false;
  showRepeatPassword = false;
  isMobile$ = this.uiService.isMobile$;
  showSocialAuth = false;
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.formService.patternValidator({ field: 'lowercase', pattern: /[a-z]/ }),
        this.formService.patternValidator({ field: 'uppercase', pattern: /[A-Z]/ }),
        this.formService.patternValidator({ field: 'numeric', pattern: /[0-9]/ }),
        this.formService.patternValidator({ field: 'special', pattern: /[!@#$%^&*()\-_=+{};:,<.>]/ }),
      ],
    ],
    repeatPassword: ['', Validators.required, this.formService.validateRepeatPassword],
  });

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
    private uiService: UIService,
  ) {}

  signUpManual(event: any, form: FormGroup) {
    const user = form.value;
    return of(event)
      .pipe(
        tap((e) => (e.target.disabled = true)),
        tap(() => form.disable()),
        mergeMap(() => this.authService.signUpManual(user)),
        tap(({ data }) => this.authService.setCookie({ name: 'token', value: data?.tokenAuth.token ?? '', expiry: 7 })),
        tap(() => {
          event.target.disabled = false;
          return form.enable();
        }),
        tap(() => this.router.navigate(['/play'])),
        catchError((error) => {
          event.target.disabled = false;
          form.enable();
          return error;
        }),
      )
      .toPromise();
  }

  async validateRepeatPassword(repeatPasswordControl: AbstractControl): Promise<{ [key: string]: any } | null> {
    const repeatPasswordError = { repeatPassword: true };
    const password = repeatPasswordControl?.root?.get('password')?.value;
    const repeatPassword = repeatPasswordControl.value;
    return password === repeatPassword ? null : repeatPasswordError;
  }
}
