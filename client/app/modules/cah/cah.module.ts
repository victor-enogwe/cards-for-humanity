import { APP_BASE_HREF, DOCUMENT, isPlatformServer } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_ID, APP_INITIALIZER, ErrorHandler, InjectionToken, NgModule, PLATFORM_ID } from '@angular/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, ɵDomSharedStylesHost } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Drivers, Storage, StorageConfig } from '@ionic/storage';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { BroadcastChannel } from 'broadcast-channel';
import { BroadCast } from 'client/app/@types/global';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CahComponent } from '../../components/shared/cah/cah.component';
import { GlobalErrorInterceptor } from '../../interceptors/global-error/global-error';
import { HttpErrorInterceptor } from '../../interceptors/http-error/http.error.interceptor';
import { CahRoutingModule } from '../../modules/routing/routing.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { AuthService } from '../../services/auth/auth.service';
import { BroadcastService } from '../../services/broadcast/broadcast.service';
import { CahDialogService } from '../../services/cah-dialog/cah-dialog.service';
import { DynamicOverlayService } from '../../services/dynamic-overlay/dynamic-overlay.service';
import { GraphqlService } from '../../services/graphql/graphql.service';
import { HttpLinkService } from '../../services/http-link/http-link.service';
import { LoadingOverlayService } from '../../services/loading-overlay/loading-overlay.service';
import { LoggerService } from '../../services/logger/logger.service';
import { MainContentRefService } from '../../services/main-content-ref/main-content-ref.service';
import { NonceService } from '../../services/nonce/nonce.service';
import { SeoService } from '../../services/seo/seo.service';
import { NoopStorage } from '../../utils/noop-storage';

export const APP_HOST = new InjectionToken<string>('host');
export const SOCIAL_AUTH_CONFIG = new InjectionToken<SocialAuthServiceConfig>('SocialAuthServiceConfig.config');
export const STORAGE_CONFIG_TOKEN = new InjectionToken<StorageConfig>('Storage.config');
export const CSP_NONCE_META = new InjectionToken<string>('cspMetaSelector');
export const BROADCAST_CHANNEL_OBSERVER = new InjectionToken<BehaviorSubject<BroadcastChannel<BroadCast>>>('cah-broadcast-observer');

const hostFactory = (document: Document) => document.location.origin;
const seoFactory = (seoService: SeoService) => seoService.start.bind(seoService);
const broadcastChannelFactory = (broadcastService: BroadcastService) => () => broadcastService.createChannel();
const cacheFactory = (gqlService: GraphqlService, router: Router) => () => gqlService.initCache().then(() => router.initialNavigation());
const storageFactory = (config: StorageConfig, pId: Object) => (isPlatformServer(pId) ? new NoopStorage() : new Storage(config));
const authFactory = (authService: AuthService) => () => authService.refreshFactory();

@NgModule({
  declarations: [CahComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'cards-against-humanity' }),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFTOKEN',
    }),
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
    HttpLink,
    HttpLinkService,
    BroadcastService,
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
    { provide: BROADCAST_CHANNEL_OBSERVER, useValue: new BehaviorSubject<BroadcastChannel<BroadCast> | null>(null) },
    { provide: ɵDomSharedStylesHost, useClass: NonceService },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: APP_ID, useValue: 'cah' },
    { provide: APP_HOST, useFactory: hostFactory, deps: [DOCUMENT] },
    { provide: APP_INITIALIZER, useFactory: authFactory, multi: true, deps: [AuthService] },
    { provide: APP_INITIALIZER, useFactory: broadcastChannelFactory, multi: true, deps: [BroadcastService] },
    { provide: APP_INITIALIZER, useFactory: cacheFactory, multi: true, deps: [GraphqlService, Router] },
    { provide: APP_INITIALIZER, useFactory: seoFactory, multi: true, deps: [SeoService] },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorInterceptor },
  ],
  bootstrap: [CahComponent],
})
export class CahModule {}
