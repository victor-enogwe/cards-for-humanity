import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'cah-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  authenticated$ = this.authService.auth$.pipe(map((auth) => (auth ? 'yes' : 'no')));
  isMobile$ = this.breakpointObserver.observe('(min-width: 576px)').pipe(map(({ matches }) => !matches));

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  async logout() {
    return lastValueFrom(this.authService.logOut());
  }
}
