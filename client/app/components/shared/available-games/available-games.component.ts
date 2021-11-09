import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameNode } from 'client/app/@types/graphql';

@Component({
  selector: 'cah-available-games',
  templateUrl: './available-games.component.html',
  styleUrls: ['./available-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableGamesComponent {
  expanded = 0;
  games: Partial<GameNode>[] = [{ numPlayers: 9, id: '1', roundTime: 10 }];
}
