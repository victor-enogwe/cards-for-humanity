import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'cah-main-container',
  templateUrl: './main-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent { }
