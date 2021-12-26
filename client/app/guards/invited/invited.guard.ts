import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { first, iif, map, Observable, of, switchMap } from 'rxjs';
import { GameResolver } from '../../resolvers/game/game.resolver';
import { GameService } from '../../services/game/game.service';

@Injectable({
  providedIn: 'root',
})
export class InvitedGuard implements CanActivate {
  constructor(private gameInprogressResolver: GameResolver, private router: Router, private gameService: GameService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const invitation$ = this.gameInprogressResolver.resolve(route).pipe(first());
    const invited$ = invitation$.pipe(map((data) => (this.gameService.isCreator(data) || this.gameService.isPlayer(data) ? false : true)));
    return invited$.pipe(switchMap((invited) => iif(() => invited, of(true), of(this.router.parseUrl('/play/lobby')))));
  }
}
