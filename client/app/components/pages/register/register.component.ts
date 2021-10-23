import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, of } from 'rxjs';
import { catchError, debounceTime, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'cah-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  signUpSocial = this.authService.signUpSocial;
  fieldHasError = this.formService.fieldHasError;
  errorMessages = {
    password: 'password must be between 8 - 30 characters, at least one(uppercase letter, lowercase letter, number and special character',
    repeatPassword: 'repeat password field must match the password field',
  };
  passwordRegex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
    repeatPassword: ['', Validators.required, this.validateRepeatPassword],
  });

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
  ) {}

  signUpManual(event: any, form: FormGroup) {
    const user = form.value;
    return lastValueFrom(
      of(event).pipe(
        tap((e) => (e.target.disabled = true)),
        tap(() => form.disable()),
        mergeMap(() => this.authService.signUpManual(user)),
        tap(({ data }) => this.authService.setToken(data?.tokenAuth.token ?? '')),
        tap(() => {
          event.target.disabled = false;
          return form.enable();
        }),
        debounceTime(1000),
        tap(() => this.router.navigate(['/play'])),
        catchError((error) => {
          event.target.disabled = false;
          form.enable();
          return error;
        }),
      ),
    );
  }

  async validateRepeatPassword(repeatPasswordControl: AbstractControl): Promise<{ [key: string]: any } | null> {
    const repeatPasswordError = { repeatPassword: true };
    const password = repeatPasswordControl?.root?.get('password')?.value;
    const repeatPassword = repeatPasswordControl.value;
    return password === repeatPassword ? null : repeatPasswordError;
  }
}
