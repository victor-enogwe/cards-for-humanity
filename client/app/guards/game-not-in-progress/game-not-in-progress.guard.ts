import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { first, iif, Observable, of, switchMap } from 'rxjs';
import { GameService } from '../../services/game/game.service';

@Injectable({
  providedIn: 'root',
})
export class GameNotInProgressGuard implements CanActivate {
  constructor(private router: Router, private gameService: GameService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const playType = this.router.getCurrentNavigation()?.extras.state?.playType;
    return this.gameService.fetchGameInProgress('network-only').pipe(
      first(),
      switchMap(({ data }) => iif(() => !data.gameInProgress || playType === 'join', of(true), of(this.router.parseUrl('/play/lobby')))),
    );
  }
}
