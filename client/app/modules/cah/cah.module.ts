import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { CahComponent } from 'client/app/components/shared/cah/cah.component';
import { INTROSPECTION_QUERY } from 'client/app/graphql';
import { CahRoutingModule } from 'client/app/modules/routing/routing.module';
import { GraphqlService } from 'client/app/services/graphql/graphql.service';
import { SeoService } from 'client/app/services/seo/seo.service';
import { environment } from 'client/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { delay, first, lastValueFrom, of, tap } from 'rxjs';

export const SOCIAL_AUTH_CONFIG = new InjectionToken<SocialAuthServiceConfig>('SocialAuthServiceConfig.config');

const seoFactory = (seoService: SeoService) => seoService.start.bind(seoService);
const cacheFactory = (graphqlService: GraphqlService) => () => graphqlService.initCache();
const graphqlFactory = () => async () => {
  if (environment.production) return;
  lastValueFrom(
    of(INTROSPECTION_QUERY).pipe(
      delay(3000),
      first(),
      tap((query) => window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__.ApolloClient?.query({ query })),
    ),
  );
};

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
    CookieService,
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
    { provide: APP_INITIALIZER, useFactory: cacheFactory, multi: true, deps: [GraphqlService] },
    { provide: APP_INITIALIZER, useFactory: seoFactory, multi: true, deps: [SeoService] },
    { provide: APP_INITIALIZER, useFactory: graphqlFactory, multi: true },
  ],
  bootstrap: [CahComponent],
})
export class CahModule {}
