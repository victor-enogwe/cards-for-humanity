import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cah-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
