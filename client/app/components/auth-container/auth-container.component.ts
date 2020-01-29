import { Component, Input } from '@angular/core'

@Component({
  selector: 'cah-auth-container',
  templateUrl: './auth-container.component.html'
})
export class AuthContainerComponent {
  @Input() title: string
}
