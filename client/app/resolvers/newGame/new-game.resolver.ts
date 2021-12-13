import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { first, Observable } from 'rxjs';
import { Maybe, NewGameNode } from '../../@types/graphql';
import { GameService } from '../../services/game/game.service';

@Injectable({
  providedIn: 'root',
})
export class NewGameResolver implements Resolve<Maybe<NewGameNode> | undefined> {
  constructor(private gameService: GameService) {}

  resolve(): Observable<Maybe<NewGameNode> | undefined> {
    return this.gameService.resolve().pipe(first());
  }
}
