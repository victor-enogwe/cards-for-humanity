import { Injectable } from '@angular/core'
import { CanLoad, UrlSegment, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { CanActivateType } from '../../@types/global'
import { AuthService } from '../../services/auth/auth.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateType {
    return this.authService.isAuthenticated()
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.authState.toPromise().then(console.log)
    switch (route.path) {
      case ('play'):
        return this.authService.isAuthenticated()
      default:
        return false
    }
  }
}
