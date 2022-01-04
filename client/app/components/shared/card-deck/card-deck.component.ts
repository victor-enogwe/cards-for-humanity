import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';
import { AnswerNode, AvailableAnswerNode, AvailableQuestionNode, JwtPayloadNode, Maybe, QuestionNode } from '../../../@types/graphql';
import { slideAnimation } from '../../../animations';
import { UIService } from '../../../services/ui/ui.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'cah-card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideAnimation],
})
export class CardDeckComponent implements OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCardSelect = new EventEmitter<Array<AvailableQuestionNode | AvailableAnswerNode | QuestionNode | AnswerNode>>();
  @HostBinding('class') class = 'd-flex flex-row flex-fill justify-content-center align-items-center row g-2 rounded-3 bg-white';
  @Input() deck?: Maybe<ReadonlyArray<Maybe<AvailableQuestionNode | AvailableAnswerNode | QuestionNode | AnswerNode>>> = [];
  @Input() pick: number = 1;
  @Input() disabled = false;
  @Input() profile!: Maybe<JwtPayloadNode>;
  avatars = this.uiService.avatarMemo;
  activeIndex = 0;
  selected$ = new BehaviorSubject<Array<AvailableQuestionNode | AvailableAnswerNode | QuestionNode | AnswerNode>>([]);
  selectionChanges$ = this.selected$.asObservable().pipe(distinctUntilChanged(this.utilsService.distinctUntilKeyChangeComparator('id')));
  displaySize$ = [this.uiService.isMobile$, this.uiService.isTablet$];
  deckDisplay$ = combineLatest([...this.displaySize$, this.uiService.navOpen$]);
  deckLength$ = this.deckDisplay$.pipe(map(([mobile, tablet, navOpen]) => (mobile ? 1 : tablet ? (navOpen ? 1 : 2) : navOpen ? 3 : 4)));
  selectSubscription!: Subscription;

  constructor(private utilsService: UtilsService, private uiService: UIService) {
    this.selectSubscription = this.selectionChanges$.subscribe((selection) => this.onCardSelect.emit(selection));
  }

  ngOnDestroy(): void {
    this.selectSubscription.unsubscribe();
  }

  getCards(deckLength: number, selected: Array<AvailableQuestionNode | AvailableAnswerNode | QuestionNode | AnswerNode> = []) {
    return (cards: readonly Maybe<AvailableQuestionNode | AvailableAnswerNode | QuestionNode | AnswerNode>[] = []) =>
      this.utilsService.splitArray<Maybe<AvailableQuestionNode | AvailableAnswerNode | QuestionNode | AnswerNode>>(deckLength)(
        selected.length >= this.pick ? selected : [...(cards ?? [])],
      );
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

  onSelect(card: AvailableQuestionNode | AvailableAnswerNode | QuestionNode | AnswerNode) {
    if (this.disabled) return;
    const prevValue = this.selected$.getValue();
    const length = prevValue.length;
    const concat = length < this.pick;
    const slice = prevValue.slice(-this.pick);
    if (!concat) slice.shift();
    if (this.pick === length) return;
    this.activeIndex = 0;
    return this.selected$.next(concat ? prevValue.concat(card) : [...slice, card]);
  }

  animated($event: any) {
    console.log($event);
  }
}
