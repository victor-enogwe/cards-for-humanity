import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'cah-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabComponent {
  @HostBinding('class') hostCLass = 'position-absolute end-10';
  @Input() tooltipPosition: TooltipPosition = 'above';
  @Input() icon = 'add';
  @Input() label = 'add';
  @Input() class = 'cah-fab';
  @Input() color: ThemePalette = 'primary';
  @Input() badge!: number;
  @Output() ngClick: EventEmitter<MouseEvent> = new EventEmitter();
}
