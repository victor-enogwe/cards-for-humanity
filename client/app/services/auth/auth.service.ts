import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FetchResult } from '@apollo/client/core';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService as Service,
  SocialAuthServiceConfig,
  SocialUser,
} from 'angularx-social-login';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, lastValueFrom, Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, first, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthUser, SignUpData } from '../../@types/global';
import {
  DeleteRefreshTokenCookieInput,
  Mutation,
  ObtainJsonWebTokenMutationInput,
  ObtainJsonWebTokenMutationPayload,
  RefreshTokenMutationInput,
  RefreshTokenMutationPayload,
  RevokeInput,
} from '../../@types/graphql';
import { DELETE_REFRESH_TOKEN_COOKIE, LOGIN_MANUAL_MUTATION, REFRESH_TOKEN, REVOKE_REFRESH_TOKEN } from '../../graphql';
import { APP_HOST, AUTH_TOKEN$, SOCIAL_AUTH_CONFIG } from '../../modules/cah/cah.module';
import { gql } from '../../utils/gql';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
  deps: ['SocialAuthServiceConfig'],
})
export class AuthService extends Service {
  rememberCookieName = 'CAH_RM';
  profile$ = new BehaviorSubject<ObtainJsonWebTokenMutationPayload['payload'] | null>(null);
  cookie$ = new BehaviorSubject<string | null>(null);
  username$ = this.profile$.pipe(
    first(),
    map((data) => data?.username!),
  );
  authProviders = { GOOGLE: 'google-oauth2', facebook: 'facebook' };
  user!: SocialUser;

  constructor(
    @Inject(SOCIAL_AUTH_CONFIG) config: SocialAuthServiceConfig | Promise<SocialAuthServiceConfig>,
    @Inject(APP_HOST) private readonly host: string,
    @Inject(AUTH_TOKEN$) private readonly auth_token$: BehaviorSubject<string | null>,
    private apollo: Apollo,
    private router: Router,
    public cookieService: CookieService,
    private utilsService: UtilsService,
  ) {
    super(config);
    this.authState.pipe(tap((user) => (this.user = user))).subscribe();
  }

  signInWithGoogle() {
    return this.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB() {
    return this.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  socialAuth(user: SocialUser & { provider: 'GOOGLE' | 'facebook' }): Observable<FetchResult<SocialUser>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($input: SocialAuthJWTInput!) {
          socialAuth(input: $input) {
            token
          }
        }
      `,
      variables: { input: { accessToken: user.authToken, provider: this.authProviders[user.provider] } },
    });
  }

  signUpSocial(event: any) {
    return lastValueFrom(
      of(event).pipe(
        tap((e) => (e.target.disabled = true)),
        mergeMap(() => (event.target.textContent.includes('Facebook') ? this.signInWithFB() : this.signInWithGoogle())),
        tap(console.log),
        mergeMap((user: SocialUser & { provider: 'GOOGLE' | 'facebook' }) => this.socialAuth(user)),
        tap((user) => this.setCookie({ name: 'token', value: user.data?.authToken ?? '', expiry: 7 })),
        tap(() => (event.target.disabled = false)),
        tap(() => this.router.navigate(['/play'])),
        catchError((error) => {
          event.target.disabled = false;
          return error;
        }),
      ),
    );
  }

  signUpManual(user: SocialUser) {
    return this.apollo.mutate<SignUpData>({
      mutation: gql`
        fragment CreateUserSuccess on CreateUserSuccess {
          token
        }

        fragment CreateUserFailEmailExists on CreateUserFailEmailExists {
          errorMessage
        }

        fragment CreateUserFailOthers on CreateUserFailOthers {
          errorMessage
        }

        mutation createUser($email: String!, $password: String!) {
          createUser(email: $email, password: $password) {
            ...CreateUserSuccess
            ...CreateUserFailEmailExists
            ...CreateUserFailOthers
          }
        }
      `,
      variables: user,
    });
  }

  signInManual(input: ObtainJsonWebTokenMutationInput) {
    return this.apollo.mutate<Pick<Mutation, 'tokenAuth'>>({
      mutation: LOGIN_MANUAL_MUTATION,
      variables: { input },
      fetchPolicy: 'network-only',
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
        tap(() => this.auth_token$.next(null)),
        tap(() => this.profile$.next(null)),
        tap(() => this.router.navigate(['/'], { replaceUrl: true })),
      );
  }

  persistAuth({ payload, token }: ObtainJsonWebTokenMutationPayload | RefreshTokenMutationPayload) {
    this.auth_token$.next(token);
    this.profile$.next(payload);
  }

  refreshTokenFactory() {
    return this.refreshToken({}).pipe(
      tap(({ data }) => this.persistAuth(data?.refreshToken!)),
      catchError(() => of(null)),
    );
  }
}
