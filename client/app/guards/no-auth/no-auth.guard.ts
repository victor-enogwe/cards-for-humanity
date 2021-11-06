import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router';
import { iif, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.auth$.pipe(switchMap((auth) => iif(() => !Boolean(auth), of(true), of(this.router.parseUrl('/play')))));
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.authService.auth$.pipe(switchMap((auth) => iif(() => !Boolean(auth), of(true), of(this.router.parseUrl('/play')))));
  }

  canLoad(): Observable<boolean> {
    return this.authService.auth$.pipe(
      map((auth) => !Boolean(auth)),
      tap((auth) => (auth ? undefined : this.router.navigateByUrl('/play'))),
    );
  }
}
