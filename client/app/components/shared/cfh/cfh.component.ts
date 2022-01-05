import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject, first, lastValueFrom } from 'rxjs';
import { loadingAnimations, navigationAnimations } from '../../../animations';
import { AUTH_TOKEN$, STATIC_URL } from '../../../modules/cfh/cfh.module';
import { SafeUrlPipe } from '../../../pipes/safe-url/safe-url.pipe';
import { AuthService } from '../../../services/auth/auth.service';
import { MainContentRefService } from '../../../services/main-content-ref/main-content-ref.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cfh-root',
  templateUrl: './cfh.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [navigationAnimations, loadingAnimations],
})
export class CfhComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContent') mainContent!: ElementRef<HTMLBaseElement>;
  @ViewChild('content') content!: ElementRef<HTMLBaseElement>;
  fullWidth$ = this.uiService.fullWidth$;
  navOpen$ = this.uiService.navOpen$;
  isMobile$ = this.uiService.isMobile$;
  authenticated$ = this.authService.authenticated$;
  svgIcons: { [key: string]: string } = {
    cfh_card: 'assets/img/card.svg',
  };

  constructor(
    @Inject(STATIC_URL) private staticURL: string,
    @Inject(AUTH_TOKEN$) private auth_token$: BehaviorSubject<string | null>,
    private matIconRegistry: MatIconRegistry,
    private safeUrlPipe: SafeUrlPipe,
    private mainContentRefService: MainContentRefService,
    private ref: ChangeDetectorRef,
    private uiService: UIService,
    private authService: AuthService,
  ) {
    Object.entries(this.svgIcons).forEach(([name, url]) =>
      this.matIconRegistry.addSvgIcon(name, this.safeUrlPipe.transform(`${this.staticURL}${url}`, 'iframe')),
    );
  }

  ngOnInit(): void {
    this.auth_token$.pipe(first()).subscribe(() => this.ref.detectChanges()); // @TODO why is this here
  }

  ngAfterViewInit(): void {
    this.mainContentRefService.mainContentRef(this.mainContent);
  }

  toggleNav() {
    return lastValueFrom(this.uiService.toggleNav());
  }
}
