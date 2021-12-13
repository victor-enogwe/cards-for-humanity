import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom, tap } from 'rxjs';
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
    @Inject(MAT_DIALOG_DATA) public data: { game: NewGameNode; inviteOnly: boolean; spectator: boolean },
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
    console.log(this.data);
    return lastValueFrom(
      this.gameService
        .invitePlayers(players.map((player) => ({ email: player, game: this.data.game.id, spectator: this.data.spectator ?? false })))
        .pipe(tap(() => this.notificationService.notify('invites', 'sent!'))),
    );
  }

  hasDuplicate(items: unknown[], value: unknown) {
    return items.filter((item) => item === value).length > 1;
  }
}
