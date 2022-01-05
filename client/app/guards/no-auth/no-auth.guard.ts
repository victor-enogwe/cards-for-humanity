import { Inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router';
import { BehaviorSubject, iif, map, Observable, of, switchMap, tap } from 'rxjs';
import { AUTH_TOKEN$ } from '../../modules/cfh/cfh.module';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(@Inject(AUTH_TOKEN$) private auth_token$: BehaviorSubject<string | null>, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth_token$.pipe(switchMap((auth) => iif(() => !Boolean(auth), of(true), of(this.router.parseUrl('/play')))));
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.auth_token$.pipe(switchMap((auth) => iif(() => !Boolean(auth), of(true), of(this.router.parseUrl('/play')))));
  }

  canLoad(): Observable<boolean> {
    return this.auth_token$.pipe(
      map((auth) => !Boolean(auth)),
      tap((auth) => (auth ? undefined : this.router.navigateByUrl('/play'))),
    );
  }
}
