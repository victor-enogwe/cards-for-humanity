import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'cah-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(public readonly activatedRoute: ActivatedRoute, public readonly authService: AuthService) { }
}
