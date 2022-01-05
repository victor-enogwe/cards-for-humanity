import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { FabMenuLayout, FabMenuLayoutDirections, MatFabMenu, MatFabMenuDirection } from '../../../@types/global';
import { fabStagger, fabToggle } from '../../../animations/fab';

@Component({
  selector: 'cfh-fab-menu',
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fabToggle, fabStagger],
})
export class FabMenuComponent {
  @HostBinding('class') hostCLass = 'position-absolute end-10';
  @Input() title = 'Open';
  @Input() tooltipPosition: TooltipPosition = 'above';
  @Input() fabButtons!: MatFabMenu[];
  @Input() icon = 'add';
  @Input() set direction(value: MatFabMenuDirection) {
    this.layout = this.layoutDirections[value ?? 'top'];
  }
  @Input() color: ThemePalette = 'accent';
  @Input() isActive!: boolean;
  @Input() disabled!: boolean;
  @Input() closeAfterSelection = true;
  @Output() ngClick: EventEmitter<string | number> = new EventEmitter<string | number>();
  layoutDirections: FabMenuLayoutDirections = {
    bottom: 'flex-column',
    top: 'flex-column-reverse',
    right: 'flex-row',
    left: 'flex-row-reverse',
  };
  layout: FabMenuLayout = this.layoutDirections.top;

  selectFabMenu(fab: MatFabMenu): void {
    this.ngClick.emit(fab.id);
    if (this.closeAfterSelection) {
      this.isActive = false;
    }
  }
}
