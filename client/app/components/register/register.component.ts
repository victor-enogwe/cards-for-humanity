import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms'
import { of } from 'rxjs'
import { tap, flatMap, catchError, debounceTime } from 'rxjs/operators'
import { FormService } from '../../services/form/form.service'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'cah-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  signUpSocial = this.authService.signUpSocial.bind(this.authService)
  fieldHasError = this.formService.fieldHasError
  errorMessages = {
    password: 'password must be between 8 - 30 characters, at least one(uppercase letter, lowercase letter, number and special character',
    repeatPassword: 'repeat password field must match the password field'
  }
  passwordRegex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex),]],
    repeatPassword: ['', Validators.required, this.validateRepeatPassword]
  })

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private router: Router
  ) { }

  signUpManual(event: any, form: FormGroup) {
    const user = form.value
    return of(event).pipe(
      tap(e => e.target.disabled = true),
      tap(() => form.disable()),
      flatMap(() => this.authService.signUpManual(user)),
      tap(() => {
        event.target.disabled = false
        return form.enable()
      }),
      debounceTime(1000),
      tap(() => this.router.navigate(['/play'])),
      catchError((error) => {
        event.target.disabled = false
        form.enable()
        return error
      })
    ).toPromise()
  }

  async validateRepeatPassword(repeatPasswordControl: AbstractControl): Promise<{ [key: string]: any } | null> {
    const repeatPasswordError = { repeatPassword: true }
    const password = repeatPasswordControl.root.get('password').value
    const repeatPassword = repeatPasswordControl.value
    return password === repeatPassword ? null : repeatPasswordError
  }
}
