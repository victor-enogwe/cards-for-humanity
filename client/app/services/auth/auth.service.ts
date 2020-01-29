import { Injectable } from '@angular/core'
import { AuthService as Service, GoogleLoginProvider, FacebookLoginProvider, AuthServiceConfig, SocialUser } from 'angularx-social-login'
import { tap } from 'rxjs/internal/operators/tap'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {
  providers: { GOOGLE: 'google-oauth2', facebook: 'facebook' }
  user: SocialUser = null

  constructor(config: AuthServiceConfig, private apollo: Apollo) {
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

  signUpSocial(user: SocialUser) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($input: SocialAuthInput!){
          socialAuth(input: $input) {
            social {
              user {
                id
              }
            }
          }
        }
      `,
      variables: { input: { accessToken: user.authToken, provider: this.providers[user.provider] } }
    })
  }

  signUp(user: SocialUser) {
    return this.apollo.mutate({
      mutation: gql`
        mutation createuser ($email: String!, $password: String!) {
          createUser (email: $email, password: $password) {
            user {
              email
            }
          }
        }
      `,
      variables: user
    })
  }
}
