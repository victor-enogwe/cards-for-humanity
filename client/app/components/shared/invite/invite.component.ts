import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewGameNode } from '../../../@types/graphql';
import { APP_HOST } from '../../../modules/cah/cah.module';
import { FormService } from '../../../services/form/form.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'cah-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent {
  inviteForm = this.formBuilder.group({
    players: new FormArray([this.createPlayerControl()], [Validators.maxLength(this.data.numPlayers), this.formService.duplicateValidator]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    @Inject(APP_HOST) public host: string,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewGameNode,
  ) {}

  get playerControl(): FormArray {
    return this.inviteForm.get('players') as FormArray;
  }

  createPlayerControl(): FormControl {
    return new FormControl('', [Validators.required, this.formService.validateUser]);
  }

  addNewPlayerControl(): void {
    this.playerControl.push(this.createPlayerControl());
  }

  removePlayerControl(position: number): void {
    this.playerControl.removeAt(position);
  }

  invitePlayers({ players }: { players: string[] }) {
    console.log(players);
  }

  hasDuplicate(items: unknown[], value: unknown) {
    return items.filter((item) => item === value).length > 1;
  }
}
