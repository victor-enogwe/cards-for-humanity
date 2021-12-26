import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { GameNode, Maybe } from '../../@types/graphql';
import { AuthService } from '../../services/auth/auth.service';
import { GameService } from '../../services/game/game.service';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class GameResolver implements Resolve<Maybe<GameNode> | undefined> {
  constructor(private gameService: GameService, private utilsService: UtilsService, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Maybe<GameNode> | undefined> {
    const id = this.utilsService.fromRelayID(route.paramMap.get('gameId')!);
    const email = this.authService.profile$.getValue()?.email!;
    return this.gameService.fetchInvitedGame({ id, email }).pipe(
      first(),
      map(({ data }) => data.invitedGame),
    );
  }
}
