import { HttpClientModule } from '@angular/common/http';
import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { CahComponent } from 'client/app/components/shared/cah/cah.component';
import { CahRoutingModule } from 'client/app/modules/routing/routing.module';
import { GraphqlService } from 'client/app/services/graphql/graphql.service';
import { SeoService } from 'client/app/services/seo/seo.service';
import { environment } from 'client/environments/environment';
import { CookieService } from 'ngx-cookie-service';

export const SOCIAL_AUTH_CONFIG = new InjectionToken<SocialAuthServiceConfig>('SocialAuthServiceConfig.config');

const bootFactory = (seoService: SeoService) => seoService.start.bind(seoService);
const cacheFactory = (graphqlService: GraphqlService) => () => graphqlService.initCache();

@NgModule({
  declarations: [CahComponent],
  imports: [
    IonicStorageModule.forRoot({
      name: '__cah',
      storeName: 'cah',
      description: 'cah store',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    BrowserModule.withServerTransition({ appId: 'cards-against-humanity' }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    CahRoutingModule,
  ],
  providers: [
    SeoService,
    GraphqlService,
    { provide: APP_INITIALIZER, useFactory: cacheFactory, multi: true, deps: [GraphqlService] },
    { provide: APP_BOOTSTRAP_LISTENER, useFactory: bootFactory, multi: true, deps: [SeoService] },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (graphqlService: GraphqlService) => graphqlService.config,
      deps: [GraphqlService],
    },
    {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider(environment.GOOGLE_OAUTH_CLIENT_ID) },
          { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider(environment.FACEBOOK_APP_ID) },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    CookieService,
  ],
  bootstrap: [CahComponent],
})
export class CahModule {}
