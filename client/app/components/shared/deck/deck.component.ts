import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cfh-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckComponent {}
