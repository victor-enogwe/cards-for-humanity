import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cah-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {}
