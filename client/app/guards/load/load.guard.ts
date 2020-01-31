import { Injectable } from '@angular/core'
import { CanLoad, Route, Router } from '@angular/router'
import { CanLoadType } from '../../@types/global'
import { AuthService } from '../../services/auth/auth.service'
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad({ path }: Route): CanLoadType {
    return of(Boolean(this.authService.token)).pipe(
      map((hasToken) => {
        switch (path) {
          case ('auth'):
            return hasToken ? false : true
          default:
            return hasToken ? true : this.router.navigate(['/auth']) && false
        }
      }),
      catchError(() => of(false)),
    )
  }
}
