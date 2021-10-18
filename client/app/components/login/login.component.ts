import { Component } from '@angular/core'
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { FormService } from '../../services/form/form.service'
import { AuthService } from '../../services/auth/auth.service'
import { of } from 'rxjs'
import { tap, mergeMap, debounceTime, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { AuthUser } from 'client/app/@types/global'

@Component({
  selector: 'cah-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  rememberCookie = 'cah_val'
  user = this.authService.decodeObject(this.cookieService.get(this.rememberCookie)) as AuthUser
  loginSocial = this.authService.signUpSocial
  fieldHasError = this.formService.fieldHasError
  loginForm = this.formBuilder.group({
    username: [this.user.username || '', [Validators.required, this.validateUser]],
    password: [this.user.password || '', [Validators.required]],
    remember: [this.user.remember],
  })

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private formService: FormService,
    private authService: AuthService,
    private router: Router
  ) { }

  validateUser(usernameControl: AbstractControl): { [key: string]: any } | null {
    const username: string = usernameControl.value
    const isEmail = username.includes('@')
    return isEmail ? Validators.email(usernameControl) : Validators.required(usernameControl)
  }

  rememberUser(user: AuthUser) {
    switch (user.remember) {
      case (true):
        return this.cookieService.set(this.rememberCookie, this.authService.encodeObject(user), undefined, this.rememberCookie)
      default:
        return this.cookieService.delete(this.rememberCookie, this.rememberCookie)
    }
  }

  loginManual(event: any, form: FormGroup) {
    const { username, password }: AuthUser = form.value
    return of(event).pipe(
      tap(e => e.target.disabled = true),
      tap(() => this.rememberUser(form.value)),
      tap(() => form.disable()),
      mergeMap(() => this.authService.signInManual({ username, password })),
      tap(console.log),
      tap(response => this.authService.setToken(response.data['tokenAuth']['token'])),
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
}
