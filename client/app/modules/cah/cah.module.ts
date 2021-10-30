import { APP_BASE_HREF, DOCUMENT, isPlatformServer } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, InjectionToken, NgModule, PLATFORM_ID } from '@angular/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, ɵDomSharedStylesHost } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Drivers, Storage, StorageConfig } from '@ionic/storage';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { CahComponent } from 'client/app/components/shared/cah/cah.component';
import { INTROSPECTION_QUERY } from 'client/app/graphql';
import { GlobalErrorInterceptor } from 'client/app/interceptors/global-error/global-error';
import { HttpErrorInterceptor } from 'client/app/interceptors/http-error/http.error.interceptor';
import { HttpHeadersInterceptor } from 'client/app/interceptors/http-header/http-header';
import { CahRoutingModule } from 'client/app/modules/routing/routing.module';
import { SharedModule } from 'client/app/modules/shared/shared.module';
import { AuthService } from 'client/app/services/auth/auth.service';
import { CahDialogService } from 'client/app/services/cah-dialog/cah-dialog.service';
import { DynamicOverlayService } from 'client/app/services/dynamic-overlay/dynamic-overlay.service';
import { ErrorHandlerService } from 'client/app/services/error-handler/error-handler.service';
import { GraphqlService } from 'client/app/services/graphql/graphql.service';
import { LoadingOverlayService } from 'client/app/services/loading-overlay/loading-overlay.service';
import { LoggerService } from 'client/app/services/logger/logger.service';
import { MainContentRefService } from 'client/app/services/main-content-ref/main-content-ref.service';
import { NonceService } from 'client/app/services/nonce/nonce.service';
import { SeoService } from 'client/app/services/seo/seo.service';
import { NoopStorage } from 'client/app/utils/noop-storage';
import { environment } from 'client/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { delay, first, lastValueFrom, of, tap } from 'rxjs';

export const APP_HOST = new InjectionToken<string>('host');
export const SOCIAL_AUTH_CONFIG = new InjectionToken<SocialAuthServiceConfig>('SocialAuthServiceConfig.config');
export const STORAGE_CONFIG_TOKEN = new InjectionToken<StorageConfig>('Storage.config');
export const CSP_NONCE_META = new InjectionToken<string>('cspMetaSelector');

const hostFactory = (document: Document) => document.location.origin;
const seoFactory = (seoService: SeoService) => seoService.start.bind(seoService);
const cacheFactory = (graphqlService: GraphqlService) => () => graphqlService.initCache();
const storageFactory = (config: StorageConfig, pId: Object) => (isPlatformServer(pId) ? new NoopStorage() : new Storage(config));
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
    BrowserModule.withServerTransition({ appId: 'cards-against-humanity' }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    CahRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    SeoService,
    GraphqlService,
    CookieService,
    AuthService,
    MainContentRefService,
    DynamicOverlayService,
    LoadingOverlayService,
    CahDialogService,
    LoggerService,
    ErrorHandlerService,
    {
      provide: STORAGE_CONFIG_TOKEN,
      useValue: {
        name: '__cah',
        storeName: 'cah',
        description: 'cah store',
        dbKey: '__CAH',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
      },
    },
    { provide: Storage, useFactory: storageFactory, deps: [STORAGE_CONFIG_TOKEN, PLATFORM_ID] },
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
    { provide: CSP_NONCE_META, useValue: 'meta[name="CSP-NONCE"]' },
    { provide: ɵDomSharedStylesHost, useClass: NonceService },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: APP_HOST, useFactory: hostFactory, deps: [DOCUMENT] },
    { provide: APP_INITIALIZER, useFactory: cacheFactory, multi: true, deps: [GraphqlService] },
    { provide: APP_INITIALIZER, useFactory: seoFactory, multi: true, deps: [SeoService] },
    { provide: APP_INITIALIZER, useFactory: graphqlFactory, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorInterceptor },
  ],
  bootstrap: [CahComponent],
})
export class CahModule {}
