import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'cah-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabComponent {
  @Input() tooltipPosition: TooltipPosition = 'above';
  @Input() icon = 'add';
  @Input() label = 'add';
  @Input() class = 'cah-fab';
  @Input() color: ThemePalette = 'primary';
  @Output() ngClick: EventEmitter<MouseEvent> = new EventEmitter();
}
