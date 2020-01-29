import { Injectable } from '@angular/core'
import { CanLoad, Route, Router } from '@angular/router'
import { CanLoadType } from '../../@types/global'
import { AuthService } from '../../services/auth/auth.service'
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs/internal/observable/of'

@Injectable({
  providedIn: 'root'
})
export class LoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad({ path }: Route): CanLoadType {
    return this.authService.authState.pipe(
      map(user => {
        switch (true) {
          case (path === 'auth'):
            return !Boolean(user)
          case (Boolean(user)):
            return true
          default:
            this.router.navigate(['/auth'])
        }
      }),
      catchError(() => of(false))
    )
  }
}
