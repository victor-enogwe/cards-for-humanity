import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cah-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}