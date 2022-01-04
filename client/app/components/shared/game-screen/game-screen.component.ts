import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
  AnswerNode,
  ApiBlackCardPickChoices,
  AvailableAnswerNode,
  AvailableQuestionNode,
  BlackCardNodeEdge,
  GameNode,
  Maybe,
  PlayerNodeEdge,
  WhiteCardNodeEdge,
} from '../../../@types/graphql';
import { AuthService } from '../../../services/auth/auth.service';
import { GameService } from '../../../services/game/game.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { UtilsService } from '../../../services/utils/utils.service';

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
  pickChoices: { [key in ApiBlackCardPickChoices]: number } = { PICK_ONE: 1, PICK_TWO: 2, PICK_THREE: 3 };
  profile$ = this.authService.profile$;

  constructor(
    private authService: AuthService,
    private gameService: GameService,
    private utilsService: UtilsService,
    private notificationService: NotificationService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const game: GameNode = changes.game.currentValue;
    if (game !== changes.game.previousValue) {
      this.player = game.playerSet.edges.find((player) => player?.node?.user.id === this.authService.profile$.getValue()?.sub);
      if (this.player?.node?.czar) this.notificationService.notify('You are the CZAR', 'YIPPEE!');
    }
  }

  onCzarSelectQuestion([{ game, card }]: Array<AvailableQuestionNode>) {
    return lastValueFrom(
      this.gameService.selectRoundQuestion({
        player: this.utilsService.fromRelayID(this.player?.node?.id!),
        card: this.utilsService.fromRelayID(card.id),
        game: this.utilsService.fromRelayID(game.id),
        rating: card.rating!, // @TODO actual user rating
        round: game.round,
      }),
    );
  }

  onPlayerSelectAnswers(cards: Array<AvailableAnswerNode>) {
    return lastValueFrom(
      this.gameService.selectPlayerRoundAnswers({
        cards: cards.map(({ card }) => ({ id: this.utilsService.fromRelayID(card.id), rating: card.rating! })),
        question: this.utilsService.fromRelayID(this.game?.question?.id!),
        game: this.utilsService.fromRelayID(this.game.id),
        player: this.utilsService.fromRelayID(this.player?.node?.id!),
        round: this.game.round,
      }),
    );
  }

  onCzarSelectAnswers(cards: Array<AnswerNode>) {
    return lastValueFrom(
      this.gameService.selectCzarRoundAnswers({
        cards: cards.map(({ card, id }) => ({ id: this.utilsService.fromRelayID(id), rating: card.rating! })),
      }),
    );
  }
}
