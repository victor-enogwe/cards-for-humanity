import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject, first } from 'rxjs';
import { loadingAnimations, navigationAnimations } from '../../../animations';
import { AUTH_TOKEN$, STATIC_URL } from '../../../modules/cah/cah.module';
import { SafeUrlPipe } from '../../../pipes/safe-url/safe-url.pipe';
import { MainContentRefService } from '../../../services/main-content-ref/main-content-ref.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cah-root',
  templateUrl: './cah.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [navigationAnimations, loadingAnimations],
})
export class CahComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContent') mainContent!: ElementRef<HTMLBaseElement>;
  fullWidth$ = this.uiService.fullWidth$;
  svgIcons: { [key: string]: string } = {
    cah_card: 'assets/img/card.svg',
  };

  constructor(
    @Inject(STATIC_URL) private staticURL: string,
    @Inject(AUTH_TOKEN$) private auth_token$: BehaviorSubject<string | null>,
    private matIconRegistry: MatIconRegistry,
    private safeUrlPipe: SafeUrlPipe,
    private mainContentRefService: MainContentRefService,
    private uiService: UIService,
    private ref: ChangeDetectorRef,
  ) {
    Object.entries(this.svgIcons).forEach(([name, url]) =>
      this.matIconRegistry.addSvgIcon(name, this.safeUrlPipe.transform(`${this.staticURL}${url}`, 'iframe')),
    );
  }

  ngOnInit(): void {
    this.auth_token$.pipe(first()).subscribe(() => this.ref.detectChanges());
  }

  ngAfterViewInit(): void {
    this.mainContentRefService.mainContentRef(this.mainContent);
  }
}
