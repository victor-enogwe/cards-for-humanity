import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cfh-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
