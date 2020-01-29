import { NgModule } from '@angular/core'
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login'
import { environment } from 'client/environments/environment'


@NgModule({
  exports: [SocialLoginModule],
  imports: [SocialLoginModule],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: () => new AuthServiceConfig([
        { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider(environment.GOOGLE_OAUTH_CLIENT_ID) },
        { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider(environment.FACEBOOK_APP_ID) }
      ])
    }
  ]
})
export class AuthModule { }
