import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { loadingAnimations, navigationAnimations } from '../../../animations';
import { STATIC_URL } from '../../../modules/cah/cah.module';
import { SafeUrlPipe } from '../../../pipes/safe-url/safe-url.pipe';
import { MainContentRefService } from '../../../services/main-content-ref/main-content-ref.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cah-root',
  templateUrl: './cah.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [navigationAnimations, loadingAnimations],
})
export class CahComponent implements AfterViewInit {
  @ViewChild('mainContent') mainContent!: ElementRef<HTMLBaseElement>;
  fullWidth$ = this.uiService.fullWidth$;
  svgIcons: { [key: string]: string } = {
    cah_card: 'assets/img/card.svg',
  };

  constructor(
    @Inject(STATIC_URL) private staticURL: string,
    private matIconRegistry: MatIconRegistry,
    private safeUrlPipe: SafeUrlPipe,
    private mainContentRefService: MainContentRefService,
    private uiService: UIService,
  ) {
    Object.entries(this.svgIcons).forEach(([name, url]) =>
      this.matIconRegistry.addSvgIcon(name, this.safeUrlPipe.transform(`${this.staticURL}${url}`, 'iframe')),
    );
  }
  ngAfterViewInit(): void {
    this.mainContentRefService.mainContentRef(this.mainContent);
  }
}
