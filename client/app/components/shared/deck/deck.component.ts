import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cah-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckComponent {}
