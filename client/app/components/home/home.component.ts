import { Component, ChangeDetectionStrategy } from '@angular/core'
import { AuthService } from 'client/app/services/auth/auth.service'

@Component({
  selector: 'cah-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  user = this.authService.user
  constructor(private authService: AuthService) { }
}
