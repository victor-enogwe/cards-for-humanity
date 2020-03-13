import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
import { first, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { CanActivateType } from '../../@types/global'
import { AuthService } from '../../services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate({ routeConfig: { path } }: ActivatedRouteSnapshot): CanActivateType {
    return this.authService.authState.pipe(
      first(),
      map(token => !token ? true : this.router.parseUrl('/play')),
      catchError(() => of(this.router.parseUrl('/play'))),
    )
  }
}
