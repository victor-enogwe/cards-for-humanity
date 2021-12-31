import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  BlackCardNode,
  BlackCardNodeEdge,
  GameNode,
  Maybe,
  PlayerNodeEdge,
  WhiteCardNode,
  WhiteCardNodeEdge,
} from '../../../@types/graphql';
import { AuthService } from '../../../services/auth/auth.service';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'cah-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameScreenComponent implements OnChanges {
  @HostBinding('class') hostClass = 'd-flex flex-column flex-fill flex-grow-1';
  @Input() game!: GameNode;
  player?: Maybe<PlayerNodeEdge>;
  decks?: { blackcardSet: Maybe<BlackCardNodeEdge>[]; whitecardSet: Maybe<WhiteCardNodeEdge>[] };
  selectedBlackCard$ = new BehaviorSubject<BlackCardNode | undefined>(undefined);
  selectedWhiteCards$ = new BehaviorSubject<WhiteCardNode[]>([]);

  constructor(private authService: AuthService, private gameService: GameService) {
    this.selectedWhiteCards$.subscribe(console.log);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const game: GameNode = changes.game.currentValue;
    if (game !== changes.game.previousValue) {
      this.player = game.playerSet.edges.find((player) => player?.node?.user.id === this.authService.profile$.getValue()?.sub);
      this.decks = this.gameService.cardDeck(game);
    }
  }

  onCardSelect(card: Maybe<BlackCardNode | WhiteCardNode>) {
    console.log(card);
    switch (card?.__typename) {
      case 'BlackCardNode':
        return this.selectedBlackCard$.next(card);
      default:
        return this.selectedWhiteCards$.next([...this.selectedWhiteCards$.getValue().slice(2), card as WhiteCardNode]);
    }
  }
}
