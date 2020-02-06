import { Injectable } from '@angular/core'
import { AuthService as Service, GoogleLoginProvider, FacebookLoginProvider, AuthServiceConfig, SocialUser } from 'angularx-social-login'
import { tap } from 'rxjs/internal/operators/tap'
import { Apollo } from 'apollo-angular'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { of } from 'rxjs'
import { flatMap, debounceTime, catchError } from 'rxjs/operators'
import { AuthUser } from '../../@types/global'
import { environment } from '../../../environments/environment'
import { SOCIAL_AUTH, CREATE_USER, tokenAuth, REFRESH_TOKEN } from '../../graphql/mutations'

@Injectable({
  providedIn: 'root',
})
export class AuthService extends Service {
  token = this.cookieService.get('token')
  authProviders = { GOOGLE: 'google-oauth2', facebook: 'facebook' }
  user: SocialUser = null

  constructor(config: AuthServiceConfig, private apollo: Apollo, private cookieService: CookieService, private router: Router) {
    super(config)
    this.authState.pipe(tap(user => (this.user = user))).subscribe()
  }

  async isAuthenticated() {
    return this.authState.toPromise().then(auth => Boolean(auth.authToken)).catch(() => false)
  }

  signInWithGoogle() {
    return this.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  signInWithFB() {
    return this.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

  socialAuth(user: SocialUser) {
    return this.apollo.mutate({
      mutation: SOCIAL_AUTH,
      variables: { input: { accessToken: user.authToken, provider: this.authProviders[user.provider] } }
    })
  }

  signUpSocial(event: any) {
    return of(event).pipe(
      tap(e => e.target.disabled = true),
      flatMap(() => event.target.textContent.includes('Facebook') ? this.signInWithFB() : this.signInWithGoogle()),
      flatMap(user => this.socialAuth(user)),
      tap(user => this.setToken(user.data['socialAuth']['token'])),
      tap(() => event.target.disabled = false),
      debounceTime(1000),
      tap(() => this.router.navigate(['/play'])),
      catchError((error) => {
        event.target.disabled = false
        return error
      })
    ).toPromise()
  }

  signUpManual(user: SocialUser) {
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: user,
    })
  }

  signInManual(user: AuthUser) {
    return this.apollo.mutate({
      mutation: tokenAuth,
      variables: { user }
    })
  }

  refreshToken(token: string) {
    return this.apollo.mutate({
      mutation: REFRESH_TOKEN,
      variables: { input: { token } }
    })
  }

  setToken(token: string) {
    if (token) {
      this.cookieService.set('token', token, 7, 'token', location ? location.hostname : null, environment.production, 'Strict')
    }
  }

  isLoggedIn() {
    return this.cookieService.check('token')
  }

  logOut() {
    this.cookieService.delete('token', 'token')
    this.signOut(true)
  }

  encodeObject(item: object) {
    return btoa(btoa(JSON.stringify(item)))
  }

  decodeObject(item: string): object {
    try {
      return JSON.parse(atob(atob(item)))
    } catch (error) {
      return {}
    }
  }
}
