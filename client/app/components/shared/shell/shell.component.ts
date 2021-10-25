import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cah-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CahShellComponent {}
