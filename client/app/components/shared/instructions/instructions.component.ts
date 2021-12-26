import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Avatar } from '../../../@types/global';
import { UIService } from '../../../services/ui/ui.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'cah-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [],
})
export class InstructionsComponent {
  instructions = [
    'Each player begins with, and will always have, 12 white answer cards.',
    'For each round, one player is randomly chosen as the Card Czar.',
    'Everyone else answers the black question card, clicks on the answer card they want.',
    'The Card Czar picks a favorite answer, and whoever played that answer wins the round.',
  ];
  avatars = this.utilsService.randomItemsFromArray<Avatar>(this.instructions.length)(this.uiService.avatars);
  colors = this.utilsService.randomItemsFromArray<string>(this.instructions.length)([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
  ]);
  activeIndex = 0;

  constructor(
    private uiService: UIService,
    private utilsService: UtilsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { showDialogClose: boolean },
  ) {}

  navigate(operation: 'forward' | 'backward') {
    this.activeIndex = this.utilsService.rollingCounter({
      min: 0,
      max: this.instructions.length - 1,
      operation,
      start: this.activeIndex,
    })();
  }
}
