import { NgModule, InjectionToken } from '@angular/core'
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login'
import { environment } from '../../../environments/environment'
import { CookieService } from 'ngx-cookie-service'

export const SOCIAL_AUTH_CONFIG = new InjectionToken<SocialAuthServiceConfig>('SocialAuthServiceConfig.config');


@NgModule({
  exports: [SocialLoginModule],
  imports: [SocialLoginModule],
  providers: [
    {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
          autoLogin: false,
          providers: [
              { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider(environment.GOOGLE_OAUTH_CLIENT_ID) },
              { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider(environment.FACEBOOK_APP_ID) }

          ],
          onError: (err) => {
            console.error(err);
          }
      } as SocialAuthServiceConfig,
    },
    CookieService
  ]
})
export class AuthModule { }
