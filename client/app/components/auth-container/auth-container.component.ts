import { Component, Input } from '@angular/core'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'cah-auth-container',
  templateUrl: './auth-container.component.html'
})
export class AuthContainerComponent {
  gameTitle = environment.APP_TITLE
  @Input() title: string
}
