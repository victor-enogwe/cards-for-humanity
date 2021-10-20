import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { InMemoryCache } from '@apollo/client/core'
import { Drivers } from '@ionic/storage'
import { IonicStorageModule } from '@ionic/storage-angular'
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login'
import { typePolicies } from 'client/app/graphql'
import { CacheService } from 'client/app/services/cache/cache.service'
import { CookieService } from 'ngx-cookie-service'
import { environment } from '../../../environments/environment'
import { CahComponent } from '../../components/shared/cah/cah.component'
import { SeoService } from '../../services/seo/seo.service'
import { GraphqlModule } from '../graphql/graphql.module'
import { CahRoutingModule } from '../routing/routing.module'

export const APOLLO_CACHE = new InjectionToken<InMemoryCache>('apollo.cache')
export const SOCIAL_AUTH_CONFIG = new InjectionToken<SocialAuthServiceConfig>('SocialAuthServiceConfig.config');

const bootFactory = (seoService: SeoService) => seoService.start.bind(seoService)
const cacheFactory = (cacheService: CacheService) => () => cacheService.init()



@NgModule({
  declarations: [CahComponent],
  imports: [
    IonicStorageModule.forRoot({
      name: '__cah',
      storeName: 'cah',
      description: 'cah store',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    BrowserModule.withServerTransition({ appId: 'cards-against-humanity' }),
    BrowserAnimationsModule,
    MatSnackBarModule,
    GraphqlModule,
    CahRoutingModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: cacheFactory, multi: true, deps: [CacheService] },
    { provide: APP_BOOTSTRAP_LISTENER, useFactory: bootFactory, multi: true, deps: [SeoService] },
    { provide: APOLLO_CACHE, useFactory: () => new InMemoryCache({ addTypename: true, typePolicies }) },
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
  ],
  bootstrap: [CahComponent]
})
export class CahModule { }
