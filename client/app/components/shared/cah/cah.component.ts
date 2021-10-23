import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'cah-root',
  templateUrl: './cah.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CahComponent {}
