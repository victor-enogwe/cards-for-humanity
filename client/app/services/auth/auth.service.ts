import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService as Service,
  SocialAuthServiceConfig,
  SocialUser,
} from 'angularx-social-login';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, iif, lastValueFrom, of, timer, zip } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, first, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthUser, BroadCast } from '../../@types/global';
import {
  CreateUserMutationInput,
  DeleteRefreshTokenCookieInput,
  Mutation,
  ObtainJsonWebTokenMutationInput,
  ObtainJsonWebTokenMutationPayload,
  RefreshTokenMutationInput,
  RefreshTokenMutationPayload,
  RevokeInput,
  SocialAuthJwtInput,
} from '../../@types/graphql';
import {
  CREATE_USER_MUTATION,
  DELETE_REFRESH_TOKEN_COOKIE,
  LOGIN_MANUAL_MUTATION,
  LOGIN_SOCIAL_MUTATION,
  REFRESH_TOKEN,
  REVOKE_REFRESH_TOKEN,
} from '../../graphql';
import { APP_HOST, AUTH_TOKEN$, SOCIAL_AUTH_CONFIG, WS_CLIENT } from '../../modules/cfh/cfh.module';
import { WSSubscriptionClient } from '../../utils/ws';
import { BroadcastService } from '../broadcast/broadcast.service';
import { NotificationService } from '../notification/notification.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
  deps: ['SocialAuthServiceConfig'],
})
export class AuthService extends Service {
  rememberCookieName = 'CFH_RM';
  REFRESH_TOKEN_INTERVAL = 299999;
  refreshTokenTimer$ = timer(this.REFRESH_TOKEN_INTERVAL, this.REFRESH_TOKEN_INTERVAL);
  refreshTokenBroadcast$ = this.refreshTokenTimer$.pipe(switchMap(() => this.refreshTokenFactory()));
  refreshToken$ = this.auth_token$.pipe(switchMap((token) => iif(() => Boolean(token), this.refreshTokenBroadcast$, of())));
  profile$ = new BehaviorSubject<ObtainJsonWebTokenMutationPayload['payload'] | null>(null);
  authenticated$ = zip(this.profile$, this.auth_token$.asObservable()).pipe(map((data) => data.every((data) => data)));
  cookie$ = new BehaviorSubject<string | null>(null);
  username$ = this.profile$.pipe(
    first(),
    map((data) => data?.username!),
  );
  authProviders = { GOOGLE: 'google-oauth2', facebook: 'facebook' };
  user!: SocialUser;
  authUrls: { [key in BroadCast['event']]?: string[] } = {
    login: ['/play'],
    logout: ['/auth', 'login'],
  };

  constructor(
    @Inject(SOCIAL_AUTH_CONFIG) config: SocialAuthServiceConfig | Promise<SocialAuthServiceConfig>,
    @Inject(APP_HOST) private readonly host: string,
    @Inject(AUTH_TOKEN$) private readonly auth_token$: BehaviorSubject<string | null>,
    @Inject(WS_CLIENT) private readonly wsClient: WSSubscriptionClient,
    private apollo: Apollo,
    private router: Router,
    private cookieService: CookieService,
    private utilsService: UtilsService,
    private notificationService: NotificationService,
    private broadcastService: BroadcastService,
  ) {
    super(config);
    this.authState.pipe(tap((user) => (this.user = user))).subscribe();
    this.broadcastService.addEventsListener('login', ({ data }) => this.persistAuth('login').call(this, data as any));
    this.broadcastService.addEventsListener('refresh_token', ({ data }) => this.persistAuth('refresh_token').call(this, data as any));
    this.broadcastService.addEventsListener('logout', ({ data }) => this.persistAuth('logout').call(this, data as any));
  }

  signInWithGoogle() {
    return this.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB() {
    return this.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  socialAuth(input: SocialAuthJwtInput) {
    return this.apollo.mutate<Pick<Mutation, 'socialAuth'>>({ mutation: LOGIN_SOCIAL_MUTATION, variables: { input: input } });
  }

  signUpSocial(event: any) {
    return lastValueFrom(
      of(event).pipe(
        tap((e) => (e.target.disabled = true)),
        mergeMap(() => iif(() => event.target.textContent.includes('Facebook'), this.signInWithFB(), this.signInWithGoogle())),
        mergeMap((user: SocialUser) => this.socialAuth({ accessToken: user.authToken, provider: user.provider })),
        tap((user) => this.setCookie({ name: 'token', value: user.data?.socialAuth?.token ?? '', expiry: 7 })),
        tap(() => (event.target.disabled = false)),
        tap(() => this.router.navigate(['/play'])),
        catchError((error) => {
          event.target.disabled = false;
          return error;
        }),
      ),
    );
  }

  signUpManual(input: CreateUserMutationInput) {
    return this.apollo
      .mutate<Pick<Mutation, 'createUser'>>({
        mutation: CREATE_USER_MUTATION,
        variables: { input },
        fetchPolicy: 'no-cache',
      })
      .pipe(
        tap(({ data }) =>
          this.notificationService.notify('user successfully created. A verification email was sent.', String(data?.createUser?.ok)),
        ),
      );
  }

  signInManual(input: ObtainJsonWebTokenMutationInput) {
    return this.apollo.mutate<Pick<Mutation, 'tokenAuth'>>({
      mutation: LOGIN_MANUAL_MUTATION,
      variables: { input },
      fetchPolicy: 'no-cache',
    });
  }

  refreshToken(input: RefreshTokenMutationInput) {
    return this.apollo.mutate<Pick<Mutation, 'refreshToken'>>({
      mutation: REFRESH_TOKEN,
      variables: { input },
      fetchPolicy: 'network-only',
    });
  }

  revokeRefreshToken(input: RevokeInput) {
    return this.apollo.mutate<Pick<Mutation, 'revokeRefreshToken'>>({
      mutation: REVOKE_REFRESH_TOKEN,
      variables: { input },
      fetchPolicy: 'network-only',
    });
  }

  deleteRefreshTokenCookie(input: DeleteRefreshTokenCookieInput) {
    return this.apollo.mutate<Pick<Mutation, 'deleteRefreshTokenCookie'>>({
      mutation: DELETE_REFRESH_TOKEN_COOKIE,
      variables: { input },
      fetchPolicy: 'network-only',
    });
  }

  setCookie({ name, value, expiry, path = '/' }: { name: string; value: string; expiry?: number | Date; path?: string }) {
    const { hostname, protocol } = new URL(this.host);
    const secure = protocol.endsWith('s');
    return this.cookieService.set(name, value, expiry, path, hostname, secure, 'Strict');
  }

  clearCookies(path = '/') {
    return this.cookieService.deleteAll(path, this.host, true, 'Strict');
  }

  async rememberUser(credentials: AuthUser) {
    switch (credentials.remember) {
      case true:
        const now = new Date(Date.now());
        return this.setCookie({
          name: this.rememberCookieName,
          value: await this.utilsService.encode(credentials, 5),
          path: '/auth/login',
          expiry: new Date(now.setFullYear(now.getFullYear() + 1)),
        });
      default:
        return this.clearCookies('/auth/login');
    }
  }

  restoreRememberedUser() {
    this.cookie$.next(this.cookieService.get(this.rememberCookieName));
  }

  logOut() {
    return of(this.clearCookies('/'))
      .pipe(switchMap(() => this.revokeRefreshToken({})))
      .pipe(switchMap(() => this.deleteRefreshTokenCookie({})))
      .pipe(switchMap(() => (Boolean(this.user?.authToken) ? this.signOut(true) : of(null))))
      .pipe(
        tap(() => this.broadcastAuth('logout', { token: undefined, payload: undefined })),
        tap(() => this.wsClient.close(true, true)),
        tap(() => this.router.navigate(['/'], { replaceUrl: true })),
      );
  }

  broadcastAuth(event: BroadCast['event'], data: Partial<ObtainJsonWebTokenMutationPayload | RefreshTokenMutationPayload>) {
    this.persistAuth(event)(data);
    return this.broadcastService.channel.postMessage({ data, event });
  }

  persistAuth(event: BroadCast['event']) {
    return ({ payload, token }: Partial<ObtainJsonWebTokenMutationPayload | RefreshTokenMutationPayload>) => {
      this.auth_token$.next(token!);
      this.profile$.next(payload);
      const url = this.authUrls[event];
      if (url) this.router.navigate(url);
    };
  }

  refreshTokenFactory() {
    return this.refreshToken({}).pipe(
      tap(({ data }) => this.broadcastAuth('refresh_token', data?.refreshToken!)),
      catchError(() => of(null)),
    );
  }
}
