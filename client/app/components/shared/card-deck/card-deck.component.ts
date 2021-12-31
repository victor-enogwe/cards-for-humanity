import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AnswerNode, BlackCardNode, Maybe, PlayerNodeEdge, QuestionNode, WhiteCardNode } from '../../../@types/graphql';
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
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCardSelect = new EventEmitter<Maybe<BlackCardNode | WhiteCardNode>>();
  @HostBinding('class') class!: string;
  @Input() czar? = false;
  @Input() type: 'question' | 'answer' = 'question';
  @Input() deck?: Maybe<ReadonlyArray<Maybe<BlackCardNode | WhiteCardNode>>> = [];
  @Input() player?: Maybe<PlayerNodeEdge>;
  @Input() show = false;
  @Input() question?: QuestionNode | null;
  @Input() answer?: AnswerNode | null;
  @Input() answers?: readonly Maybe<AnswerNode>[] | null;
  activeIndex = 0;
  displaySize$ = [this.uiService.isMobile$, this.uiService.isTablet$];
  deckDisplay$ = combineLatest([...this.displaySize$, this.uiService.navOpen$]);
  deckLength$ = this.deckDisplay$.pipe(map(([mobile, tablet, navOpen]) => (mobile ? 1 : tablet ? (navOpen ? 1 : 2) : navOpen ? 3 : 4)));

  constructor(private utilsService: UtilsService, private uiService: UIService, private notificationService: NotificationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue: type } = changes.type ?? {};
    const { currentValue: player, previousValue: prevPlayer } = changes.player ?? {};
    this.class = `d-flex flex-row flex-fill justify-content-center align-items-center row g-2 deck-${type} rounded-3 bg-light`;
    // const { currentValue: deck } = changes.deck ?? {};
    // const { currentValue: question } = changes.question ?? {};
    // const { currentValue: answer } = changes.answer ?? {};
    // const { currentValue: answers } = changes.answers ?? {};

    // switch (type) {
    //   case 'question':
    //     if (Boolean(deck)) this.cards = this.utilsService.randomItemsFromArray<Maybe<BlackCardNodeEdge | WhiteCardNodeEdge>>(12)(deck);
    //     if (!Boolean(deck)) this.cards = deck;
    //     break;
    //   default:
    // }

    if (prevPlayer?.node?.czar !== player?.node?.czar) {
      if (player?.node?.czar) this.notificationService.notify('You are now the CZAR', 'YIPPEE!');
    }
  }

  getCards(deckLength: number) {
    return (cards: readonly Maybe<BlackCardNode | WhiteCardNode>[]) =>
      this.utilsService.splitArray<Maybe<BlackCardNode | WhiteCardNode>>(deckLength)([...cards]);
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

  onSelect(card: Maybe<BlackCardNode | WhiteCardNode>) {
    return this.onCardSelect.emit(card);
  }
}
