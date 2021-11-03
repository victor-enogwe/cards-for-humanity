import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router';
import { iif, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  auth$ = of(this.authService.isLoggedIn());

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth$.pipe(switchMap((auth) => iif(() => !auth, of(true), of(this.router.parseUrl('/play')))));
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.auth$.pipe(switchMap((auth) => iif(() => !auth, of(true), of(this.router.parseUrl('/play')))));
  }

  canLoad(): Observable<boolean> {
    return this.auth$.pipe(
      tap(() => console.log(this.authService.cookieService.check('token'), document.cookie)),
      tap((auth) => (auth ? this.router.navigateByUrl('/play') : {})),
      map((auth) => !auth),
    );
  }
}
