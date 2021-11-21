import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { loadingAnimations, navigationAnimations } from '../../../animations';
import { STATIC_URL } from '../../../modules/cah/cah.module';
import { SafeUrlPipe } from '../../../pipes/safe-url/safe-url.pipe';
import { MainContentRefService } from '../../../services/main-content-ref/main-content-ref.service';

@Component({
  selector: 'cah-root',
  templateUrl: './cah.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [navigationAnimations, loadingAnimations],
})
export class CahComponent implements AfterViewInit {
  @ViewChild('mainContent') mainContent!: ElementRef<HTMLBaseElement>;
  fullWidth$ = new BehaviorSubject<boolean>(false);
  svgIcons: { [key: string]: string } = {
    cah_card: 'assets/img/card.svg',
  };

  constructor(
    @Inject(STATIC_URL) private staticURL: string,
    private matIconRegistry: MatIconRegistry,
    private safeUrlPipe: SafeUrlPipe,
    private mainContentRefService: MainContentRefService,
  ) {
    Object.entries(this.svgIcons).forEach(([name, url]) =>
      this.matIconRegistry.addSvgIcon(name, this.safeUrlPipe.transform(`${this.staticURL}${url}`, 'iframe')),
    );
  }
  ngAfterViewInit(): void {
    this.mainContentRefService.mainContentRef(this.mainContent);
  }
}
