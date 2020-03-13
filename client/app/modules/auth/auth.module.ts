import { NgModule } from '@angular/core'
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login'
import { environment } from '../../../environments/environment'
import { CookieService } from 'ngx-cookie-service'

@NgModule({
  imports: [SocialLoginModule],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: () => new AuthServiceConfig([
        { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider(environment.GOOGLE_OAUTH_CLIENT_ID) },
        { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider(environment.FACEBOOK_APP_ID) }
      ])
    },
    CookieService
  ]
})
export class AuthModule { }
