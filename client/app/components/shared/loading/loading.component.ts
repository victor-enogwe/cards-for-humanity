import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerOptions } from 'client/app/@types/global';

@Component({
  selector: 'cah-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  constructor(public readonly data: MatProgressSpinnerOptions) {}
}