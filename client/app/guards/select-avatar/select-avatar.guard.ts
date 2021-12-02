import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectAvatarGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const playTypes = ['create', 'join'];
    return playTypes.includes(this.router.getCurrentNavigation()?.extras.state?.playType) ? of(true) : of(this.router.parseUrl('/play'));
  }
}
