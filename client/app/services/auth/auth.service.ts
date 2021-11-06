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
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, debounceTime, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SignUpData } from '../../@types/global';
import { Mutation, ObtainJsonWebTokenInput, RefreshInput, SaveProfileInput, UserNode } from '../../@types/graphql';
import { IS_LOGGED_IN_QUERY, LOGIN_MANUAL_MUTATION, PROFILE_QUERY, REFRESH_TOKEN, SAVE_PROFILE_MUTATION } from '../../graphql';
import { SOCIAL_AUTH_CONFIG } from '../../modules/cah/cah.module';
import { gql } from '../../utils/gql';

@Injectable({
  providedIn: 'root',
  deps: ['SocialAuthServiceConfig'],
})
export class AuthService extends Service {
  auth$ = new BehaviorSubject<string | null>(null);
  profile$ = new BehaviorSubject<Partial<UserNode> | null>(null);
  authProviders = { GOOGLE: 'google-oauth2', facebook: 'facebook' };
  user!: SocialUser;

  constructor(
    @Inject(SOCIAL_AUTH_CONFIG) config: SocialAuthServiceConfig | Promise<SocialAuthServiceConfig>,
    private apollo: Apollo,
    public cookieService: CookieService,
    private router: Router,
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
    return of(event)
      .pipe(
        tap((e) => (e.target.disabled = true)),
        mergeMap(() => (event.target.textContent.includes('Facebook') ? this.signInWithFB() : this.signInWithGoogle())),
        tap(console.log),
        mergeMap((user: SocialUser & { provider: 'GOOGLE' | 'facebook' }) => this.socialAuth(user)),
        tap((user) => this.setCookie({ name: 'token', value: user.data?.authToken ?? '', expiry: 7 })),
        tap(() => (event.target.disabled = false)),
        debounceTime(1000),
        tap(() => this.router.navigate(['/play'])),
        catchError((error) => {
          event.target.disabled = false;
          return error;
        }),
      )
      .toPromise();
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

  signInManual(input: ObtainJsonWebTokenInput) {
    return this.apollo.mutate<Pick<Mutation, 'tokenAuth'>>({ mutation: LOGIN_MANUAL_MUTATION, variables: { input } });
  }

  refreshToken(input: RefreshInput) {
    console.log(input);
    return this.apollo.mutate({ mutation: REFRESH_TOKEN, variables: { input } });
  }

  saveProfile(input: SaveProfileInput) {
    return this.apollo.mutate<Pick<Mutation, 'saveProfile'>>({ mutation: SAVE_PROFILE_MUTATION, variables: { input } });
  }

  setCookie({ name, value, expiry, path = '/' }: { name: string; value: string; expiry?: number | Date; path?: string }) {
    return this.cookieService.set(name, value, expiry, path, undefined, environment.production, 'Strict');
  }

  clearCookies(path = '/') {
    return this.cookieService.deleteAll(path);
  }

  logOut() {
    this.clearCookies('/');
    this.apollo.client.writeQuery({ query: IS_LOGGED_IN_QUERY, data: false });
    this.apollo.client.writeQuery({ query: PROFILE_QUERY, data: null });
    this.signOut(true);
  }

  encodeObject(item: object) {
    return btoa(btoa(JSON.stringify(item)));
  }

  decodeObject(item: string): object {
    try {
      return JSON.parse(atob(atob(item)));
    } catch (error) {
      return {};
    }
  }

  refreshFactory() {
    return this.refreshToken({}).pipe(catchError(() => of(null)));
  }
}
