import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayType } from '../../../@types/global';

@Component({
  selector: 'cah-play-type',
  templateUrl: './play-type.component.html',
  styleUrls: ['./play-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayTypeComponent {
  @Input() playType: PlayType = 'join';
}
