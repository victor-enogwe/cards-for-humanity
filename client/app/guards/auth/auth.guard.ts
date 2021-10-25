import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CanActivateType } from '../../@types/global';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  auth$ = of(this.authService.isLoggedIn());

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): CanActivateType {
    return this.auth$.pipe(switchMap((auth) => iif(() => auth, of(true), of(this.router.parseUrl('/auth')))));
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.auth$.pipe(switchMap((auth) => iif(() => auth, of(true), of(this.router.parseUrl('/auth')))));
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.auth$;
  }
}
