import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map } from 'rxjs';
import { AUTH_TOKEN$ } from '../../../modules/cfh/cfh.module';
import { AuthService } from '../../../services/auth/auth.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cfh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  authenticated$ = this.auth_token$.pipe(map((auth) => (auth ? 'yes' : 'no')));
  isMobile$ = this.uiService.isMobile$;
  navOpen$ = this.uiService.navOpen$;

  constructor(
    @Inject(AUTH_TOKEN$)
    private auth_token$: BehaviorSubject<string | null>,
    private uiService: UIService,
    private authService: AuthService,
  ) {}

  async logout() {
    return lastValueFrom(this.authService.logOut());
  }

  async toggleNav() {
    return lastValueFrom(this.uiService.toggleNav());
  }
}
