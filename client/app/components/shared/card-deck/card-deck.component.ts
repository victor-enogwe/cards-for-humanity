import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { BlackCardNodeEdge, GameNode, Maybe, PlayerNodeEdge, WhiteCardNodeEdge } from '../../../@types/graphql';
import { NotificationService } from '../../../services/notification/notification.service';
import { UIService } from '../../../services/ui/ui.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'cah-card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDeckComponent implements OnChanges {
  @HostBinding('class') class!: string;
  @Input() game!: GameNode;
  @Input() czar? = false;
  @Input() type: 'question' | 'answer' = 'question';
  @Input() deck?: Maybe<BlackCardNodeEdge | WhiteCardNodeEdge>[];
  @Input() player?: Maybe<PlayerNodeEdge>;
  activeIndex = 0;
  cards: Maybe<BlackCardNodeEdge | WhiteCardNodeEdge>[] = [];
  displaySize$ = [this.uiService.isMobile$, this.uiService.isTablet$];
  deckLength$ = combineLatest(this.displaySize$).pipe(map(([mobile, tablet]) => (mobile ? 1 : tablet ? 3 : 4)));

  constructor(private utilsService: UtilsService, private uiService: UIService, private notificationService: NotificationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue: currentType, previousValue: prevType } = changes.type;
    const { currentValue: deck } = changes.deck;
    const { currentValue: player, previousValue: prevPlayer } = changes.player;
    if (prevType !== currentType)
      this.class = `d-flex flex-row justify-content-center align-items-center row g-2 deck-${this.type} rounded-3 bg-light`;
    if (deck) {
      switch (this.type) {
        case 'question':
          this.cards = this.utilsService.randomItemsFromArray<Maybe<BlackCardNodeEdge | WhiteCardNodeEdge>>(12)(deck);
          break;
        default:
          this.cards = deck;
      }
    }
    if (prevPlayer?.node?.czar !== player?.node?.czar) {
      if (player?.node?.czar) this.notificationService.notify('You are now the CZAR', 'YIPPEE!');
    }
  }

  getCards(deckLength: number) {
    return (cards: Maybe<BlackCardNodeEdge | WhiteCardNodeEdge>[]) =>
      this.utilsService.splitArray<Maybe<BlackCardNodeEdge | WhiteCardNodeEdge>>(deckLength)(cards);
  }

  navigate(itemsLength: number) {
    return (operation: 'forward' | 'backward') => {
      this.activeIndex = this.utilsService.rollingCounter({
        min: 0,
        max: itemsLength - 1,
        operation,
        start: this.activeIndex,
      })();
    };
  }
}
