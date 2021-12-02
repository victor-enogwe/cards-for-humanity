import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map } from 'rxjs';
import { AUTH_TOKEN$ } from '../../../modules/cah/cah.module';
import { AuthService } from '../../../services/auth/auth.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cah-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  authenticated$ = this.auth_token$.pipe(map((auth) => (auth ? 'yes' : 'no')));
  isMobile$ = this.uiService.isMobile$;

  constructor(
    @Inject(AUTH_TOKEN$) private auth_token$: BehaviorSubject<string | null>,
    private uiService: UIService,
    private authService: AuthService,
  ) {}

  async logout() {
    return lastValueFrom(this.authService.logOut());
  }
}
