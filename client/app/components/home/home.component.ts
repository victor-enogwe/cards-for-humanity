import { Component, ChangeDetectionStrategy } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'cah-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(public readonly authService: AuthService) { }
}
