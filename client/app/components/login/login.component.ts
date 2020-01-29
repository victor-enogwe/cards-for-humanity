import { Component } from '@angular/core'
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { FormService } from '../../services/form/form.service'

@Component({
  selector: 'cah-login',
  templateUrl: './login.component.html',
  providers: [CookieService]
})
export class LoginComponent {
  fieldHasError = this.formService.fieldHasError
  loginForm = this.formBuilder.group({
    user: new FormControl(this.cookieService.get('user'), [this.validateUser]),
    password: new FormControl(this.cookieService.get('password'), [Validators.required]),
    remember: new FormControl(),
  })

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private formService: FormService) { }

  validateUser(userControl: AbstractControl): { [key: string]: any } | null {
    const user: string = userControl.value
    const isEmail = user.includes('@')
    return isEmail ? Validators.email(userControl) : Validators.required(userControl)
  }
}
