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
import { SignUpData } from 'client/app/@types/global';
import { APP_HOST, SOCIAL_AUTH_CONFIG } from 'client/app/modules/cah/cah.module';
import { gql } from 'client/app/utils/gql';
import { environment } from 'client/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom, Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, debounceTime, mergeMap } from 'rxjs/operators';
import { AuthUser } from '../../@types/global';

@Injectable({
  providedIn: 'root',
  deps: ['SocialAuthServiceConfig'],
})
export class AuthService extends Service {
  authProviders = { GOOGLE: 'google-oauth2', facebook: 'facebook' };
  user!: SocialUser;

  constructor(
    @Inject(APP_HOST) private host: string,
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
    return lastValueFrom(
      of(event).pipe(
        tap((e) => (e.target.disabled = true)),
        mergeMap(() => (event.target.textContent.includes('Facebook') ? this.signInWithFB() : this.signInWithGoogle())),
        tap(console.log),
        mergeMap((user: SocialUser & { provider: 'GOOGLE' | 'facebook' }) => this.socialAuth(user)),
        tap((user) => this.setToken(user.data?.authToken ?? '')),
        tap(() => (event.target.disabled = false)),
        debounceTime(1000),
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

  signInManual(user: AuthUser) {
    return this.apollo.mutate({
      mutation: gql`
        mutation tokenAuth($user: ObtainJSONWebTokenInput!) {
          tokenAuth(input: $user) {
            token
          }
        }
      `,
      variables: { user },
    });
  }

  refreshToken(token: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation refreshToken($input: RefreshInput!) {
          refreshToken(input: $input) {
            token
          }
        }
      `,
      variables: { input: { token } },
    });
  }

  setToken(token: string) {
    if (token) {
      this.cookieService.set('token', token, 7, 'token', this.host, environment.production, 'Strict');
    }
  }

  isLoggedIn() {
    return this.cookieService.check('token');
  }

  logOut() {
    this.cookieService.delete('token', 'token');
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
}
