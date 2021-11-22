import { ChangeDetectionStrategy, Component } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cah-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  authenticated$ = this.authService.auth$.pipe(map((auth) => (auth ? 'yes' : 'no')));
  isMobile$ = this.uiService.isMobile$;

  constructor(private uiService: UIService, private authService: AuthService) {}

  async logout() {
    return lastValueFrom(this.authService.logOut());
  }
}
