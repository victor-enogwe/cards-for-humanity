import { Injectable } from '@angular/core'
import { AuthService as Service, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {

  async isAuthenticated() {
    return this.authState.toPromise().then(auth => Boolean(auth.authToken)).catch(() => false)
  }

  signInWithGoogle() {
    return this.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  signInWithFB() {
    return this.signIn(FacebookLoginProvider.PROVIDER_ID)
  }
}
