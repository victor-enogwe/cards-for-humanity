import { Injectable } from '@angular/core'
import { AuthService as Service, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login'
import { tap } from 'rxjs/internal/operators/tap'
import { Apollo } from 'apollo-angular'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { of, from } from 'rxjs'
import { flatMap, debounceTime, catchError, map, switchMap } from 'rxjs/operators'
import { AuthUser } from '../../@types/global'
import { environment } from '../../../environments/environment'
import { socialAuth, createUser, tokenAuth, refreshToken } from '../../graphql/mutations'
import * as queries from '../../graphql/queries'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  client = this.apollo.getClient()
  authState = from(this.client.watchQuery({ query: queries.tokenAuth })).pipe(map(result => result.data.tokenAuth.token))
  authProviders = { GOOGLE: 'google-oauth2', facebook: 'facebook' }

  constructor(private authService: Service, private apollo: Apollo, private cookieService: CookieService, private router: Router) { }

  signInWithGoogle() {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  signInWithFB() {
    return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

  signUpSocial(event: any) {
    return of(event).pipe(
      tap(e => e.target.disabled = true),
      switchMap(() => event.target.textContent.includes('Facebook') ? this.signInWithFB() : this.signInWithGoogle()),
      flatMap(user => this.socialAuth(user)),
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
      mutation: createUser,
      variables: user,
      refetchQueries: [{ query: queries.tokenAuth }]
    })
  }

  socialAuth(user: SocialUser) {
    return this.apollo.mutate({
      mutation: socialAuth,
      variables: { input: { accessToken: user.authToken, provider: this.authProviders[user.provider] } },
      refetchQueries: [{ query: queries.tokenAuth }]
    })
  }

  signInManual(user: AuthUser) {
    return this.apollo.mutate({
      mutation: tokenAuth,
      variables: { user },
      refetchQueries: [{ query: queries.tokenAuth }]
    })
  }

  refreshToken(token: string) {
    return this.apollo.mutate({
      mutation: refreshToken,
      variables: { input: { token } }
    })
  }

  logOut() {
    return this.client.resetStore()
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
