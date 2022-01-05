import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerOptions } from '../../../utils/mat-progress-spinner';

@Component({
  selector: 'cfh-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  constructor(public readonly data: MatProgressSpinnerOptions) {}
}
