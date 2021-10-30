import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Event as RouterEvents, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { loadingAnimations, navigationAnimations } from 'client/app/animations';
import { APP_HOST } from 'client/app/modules/cah/cah.module';
import { SafeUrlPipe } from 'client/app/pipes/safe-url/safe-url.pipe';
import { filter, map } from 'rxjs';

@Component({
  selector: 'cah-root',
  templateUrl: './cah.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [navigationAnimations, loadingAnimations],
})
export class CahComponent {
  loading$ = this.router.events.pipe(
    filter((event) => this.routerEventsFilter(event)),
    map((event) => this.routerEventsSubscriber(event)),
  );
  svgIcons: { [key: string]: string } = {
    cah_card: 'assets/img/card.svg',
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_HOST) protected host: string,
    private matIconRegistry: MatIconRegistry,
    private safeUrlPipe: SafeUrlPipe,
    private router: Router,
  ) {
    Object.entries(this.svgIcons).forEach(([name, url]) => {
      const ssr = isPlatformServer(this.platformId);
      const link = `${ssr ? `static/browser/${url}` : url}`;
      return this.matIconRegistry.addSvgIcon(name, this.safeUrlPipe.transform(link, 'iframe'));
    });
  }

  routerEventsFilter(event: RouterEvents): boolean {
    switch (true) {
      case event instanceof NavigationStart:
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError:
        return true;
      default:
        return false;
    }
  }

  routerEventsSubscriber(event: RouterEvents): boolean {
    return event instanceof NavigationStart ? true : false;
  }
}
