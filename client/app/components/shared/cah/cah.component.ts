import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SafeUrlPipe } from 'client/app/pipes/safe-url/safe-url.pipe';

@Component({
  selector: 'cah-root',
  templateUrl: './cah.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CahComponent implements OnInit {
  svgIcons: { [key: string]: string } = {
    cah_card: '/assets/img/card.svg',
  };

  constructor(private matIconRegistry: MatIconRegistry, private safeUrlPipe: SafeUrlPipe) {}

  ngOnInit(): void {
    Object.entries(this.svgIcons).forEach(([name, url]) =>
      this.matIconRegistry.addSvgIcon(name, this.safeUrlPipe.transform(url, 'iframe')),
    );
  }
}
