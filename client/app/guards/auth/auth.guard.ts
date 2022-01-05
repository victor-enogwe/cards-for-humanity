import { Inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CanActivateType } from '../../@types/global';
import { AUTH_TOKEN$ } from '../../modules/cfh/cfh.module';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(@Inject(AUTH_TOKEN$) private auth_token$: BehaviorSubject<string | null>, private router: Router) {}

  canActivate(): CanActivateType {
    return this.auth_token$.pipe(switchMap((auth) => iif(() => Boolean(auth), of(true), of(this.router.parseUrl('/auth')))));
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.auth_token$.pipe(switchMap((auth) => iif(() => Boolean(auth), of(true), of(this.router.parseUrl('/auth')))));
  }

  canLoad(route: Route, urlSegments: UrlSegment[]): Observable<boolean> {
    return this.auth_token$.pipe(
      map((auth) => Boolean(auth)),
      tap((can) => (can ? undefined : this.router.navigateByUrl('/auth'))),
    );
  }
}
