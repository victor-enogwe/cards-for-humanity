import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { NewGameNode } from '../../@types/graphql';
import { GameService } from '../../services/game/game.service';

@Injectable({
  providedIn: 'root',
})
export class NewGameResolver implements Resolve<NewGameNode> {
  constructor(private gameService: GameService) {}

  resolve(): Observable<NewGameNode> {
    return this.gameService.resolve();
  }
}
