import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { GameNode, Maybe } from '../../@types/graphql';
import { GameService } from '../../services/game/game.service';

@Injectable({
  providedIn: 'root',
})
export class GameInProgressResolver implements Resolve<Maybe<GameNode> | undefined> {
  constructor(private gameService: GameService) {}

  resolve(): Observable<Maybe<GameNode> | undefined> {
    return this.gameService.fetchGameInProgress().pipe(
      first(),
      map(({ data }) => data.gameInProgress),
    );
  }
}
