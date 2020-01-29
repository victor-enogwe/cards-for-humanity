import { Component } from '@angular/core'
import { FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { FormService } from '../../services/form/form.service'
import { of } from 'rxjs'
import { tap, flatMap, catchError } from 'rxjs/operators'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'cah-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  fieldHasError = this.formService.fieldHasError
  errorMessages = {
    password: 'password must be between 8 - 30 characters, at least one(uppercase letter, lowercase letter, number and special character',
    repeatPassword: 'repeat password field must match the password field'
  }
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
  registerForm = this.formBuilder.group({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.pattern(this.passwordRegex)]),
    repeatPassword: new FormControl('', [this.validateRepeatPassword])
  })

  constructor(private formBuilder: FormBuilder, private formService: FormService, private authService: AuthService) { }

  signUpSocial(event: any) {
    return of(event).pipe(
      tap(e => e.target.disabled = true),
      flatMap(() => event.target.textContent.includes('Facebook') ? this.authService.signInWithFB() : this.authService.signInWithGoogle()),
      tap(console.log),
      flatMap(user => this.authService.signUpSocial(user)),
      tap(console.log),
      tap(() => event.target.disabled = false),
      catchError((error) => {
        console.log(error)
        event.target.disabled = false
        return error
      })
    ).toPromise()
  }

  validateRepeatPassword(repeatPasswordControl: AbstractControl): { [key: string]: any } | null {
    const repeatPasswordError = { repeatPassword: { error: 'khjkjkjjkjkj' } }
    try {
      const password = repeatPasswordControl.root.get('password').value
      const repeatPassword = repeatPasswordControl.get('repeatPassword').value
      console.log(password, repeatPassword)
      return password === repeatPassword ? null : repeatPasswordError
    } catch (error) {
      return repeatPasswordError
    }
  }
}
