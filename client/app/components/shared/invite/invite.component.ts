import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom, tap } from 'rxjs';
import { ConfirmDialogData } from '../../../@types/global';
import { NewGameNode } from '../../../@types/graphql';
import { APP_HOST } from '../../../modules/cah/cah.module';
import { FormService } from '../../../services/form/form.service';
import { GameService } from '../../../services/game/game.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'cah-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent {
  numPlayers = this.data.spectator ? this.data.game.numSpectators : this.data.game.numPlayers - 1;
  inviteForm = this.formBuilder.group({
    players: new FormArray([this.createPlayerControl()], [Validators.maxLength(this.numPlayers), this.formService.duplicateValidator]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    @Inject(APP_HOST) public host: string,
    public dialogRef: MatDialogRef<InviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { game: NewGameNode; inviteOnly: boolean; spectator: boolean } & ConfirmDialogData,
    private gameService: GameService,
    private notificationService: NotificationService,
  ) {}

  get playerControl(): FormArray {
    return this.inviteForm.get('players') as FormArray;
  }

  createPlayerControl(): FormControl {
    return new FormControl('', [Validators.required, Validators.email]);
  }

  addNewPlayerControl(): void {
    this.playerControl.push(this.createPlayerControl());
  }

  removePlayerControl(position: number): void {
    this.playerControl.removeAt(position);
  }

  invitePlayers({ players }: { players: string[] }) {
    return lastValueFrom(
      this.gameService
        .invitePlayers(players.map((player) => ({ email: player, game: this.data.game.id, spectator: this.data.spectator ?? false })))
        .pipe(tap(() => [this.notificationService.notify('invites', 'sent!'), this.dialogRef.close()])),
    );
  }

  hasDuplicate(items: unknown[], value: unknown) {
    return items.filter((item) => item === value).length > 1;
  }
}
