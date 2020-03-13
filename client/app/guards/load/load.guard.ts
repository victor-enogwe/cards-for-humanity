import { Injectable } from '@angular/core'
import { CanLoad, Route } from '@angular/router'
import { map, catchError, first } from 'rxjs/operators'
import { of } from 'rxjs'
import { CanLoadType } from '../../@types/global'
import { AuthService } from '../../services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class LoadGuard implements CanLoad {
  constructor(private authService: AuthService) { }

  canLoad({ path }: Route): CanLoadType {
    return this.authService.authState.pipe(
      first(),
      map(Boolean),
      catchError(() => of(false)),
    )
  }
}
