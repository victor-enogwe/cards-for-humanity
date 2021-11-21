import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { NewGameNode } from '../../../@types/graphql';
import { InviteComponent } from '../../shared/invite/invite.component';

@Component({
  selector: 'cah-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent {
  newGame$: Observable<NewGameNode> = this.route.data.pipe(map((data) => data.newGame));
  inviteOnly: boolean = true;
  inviteComponent = InviteComponent;

  constructor(private route: ActivatedRoute) {}
}
