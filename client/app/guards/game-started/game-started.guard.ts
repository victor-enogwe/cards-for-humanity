import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { first, iif, map, Observable, of, switchMap } from 'rxjs';
import { GameResolver } from '../../resolvers/game/game.resolver';

@Injectable({
  providedIn: 'root',
})
export class GameStartedGuard implements CanActivate {
  constructor(private gameInprogressResolver: GameResolver, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const gameInProgress$ = this.gameInprogressResolver.resolve(route).pipe(first());
    const gameNotStarted$ = gameInProgress$.pipe(map((data) => ['AWAITING_PLAYERS', 'GAME_ENDED'].includes(data?.status!)));
    return gameNotStarted$.pipe(switchMap((status) => iif(() => status, of(true), of(this.router.parseUrl('/play/lobby')))));
  }
}
