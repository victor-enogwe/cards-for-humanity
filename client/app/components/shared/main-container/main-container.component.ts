import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cah-main-container',
  templateUrl: './main-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent {
  @Input()
  @HostBinding('class')
  class = 'd-flex flex-column flex-grow-1 flex-fill w-100 justify-content-center align-items-center';
}
