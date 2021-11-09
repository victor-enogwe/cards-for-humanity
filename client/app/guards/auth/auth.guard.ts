import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CanActivateType } from '../../@types/global';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): CanActivateType {
    return this.authService.auth$.pipe(switchMap((auth) => iif(() => Boolean(auth), of(true), of(this.router.parseUrl('/auth')))));
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.authService.auth$.pipe(switchMap((auth) => iif(() => Boolean(auth), of(true), of(this.router.parseUrl('/auth')))));
  }

  canLoad(route: Route, urlSegments: UrlSegment[]): Observable<boolean> {
    return this.authService.auth$.pipe(
      map((auth) => Boolean(auth)),
      tap((can) => (can ? undefined : this.router.navigateByUrl('/auth'))),
    );
  }
}
