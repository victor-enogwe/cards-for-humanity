import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'cah-main-container',
  templateUrl: './main-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent {
  @HostBinding('class') class = 'd-flex flex-column flex-grow-1 flex-fill w-100 justify-content-center align-items-center';
}
