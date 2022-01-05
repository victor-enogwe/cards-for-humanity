import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'cfh-auth-container',
  templateUrl: './auth-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthContainerComponent {
  gameTitle = environment.APP_TITLE;
  @Input() title!: string;
}
