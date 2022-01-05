import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardType } from '../../../@types/global';

@Component({
  selector: 'cfh-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() cardType: CardType = CardType.PICK1;
  @Input() gameType!: string;
  @Input() text!: string;
  isQuestion = this.cardType !== CardType.ANSWER;
  cardClass = { 'text-white': this.isQuestion, 'bg-dark': this.isQuestion };
}
