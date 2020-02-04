import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
import { CanActivateType } from '../../@types/global'
import { AuthService } from '../../services/auth/auth.service'
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate({ routeConfig: { path } }: ActivatedRouteSnapshot): CanActivateType {
    return of(this.authService.isLoggedIn()).pipe(
      map((hasToken) => {
        switch (path) {
          case ('auth'):
            return hasToken ? false : true
          default:
            return hasToken ? true : this.router.parseUrl('/auth')
        }
      }),
      catchError(() => of(this.router.parseUrl('/auth'))),
    )
  }
}
