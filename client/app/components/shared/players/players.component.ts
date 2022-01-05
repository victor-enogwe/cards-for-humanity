import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import merge from 'lodash.merge';
import { GameNode, InviteNode, InviteNodeEdge, Maybe, PlayerNode, PlayerNodeEdge, ProfileNode } from '../../../@types/graphql';
import { AuthService } from '../../../services/auth/auth.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cfh-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersComponent implements OnChanges {
  @HostBinding('class') hostClass = 'd-flex flex-column flex-fill flex-grow-1';
  @Input() game!: GameNode;
  playerMemo: { [key: string]: Maybe<PlayerNode & InviteNode & { profile: ProfileNode }> } = {};
  avatars = this.uiService.avatarMemo;
  invitedAvatar = this.uiService.invitedAvatar;
  profile$ = this.authService.profile$;

  constructor(private uiService: UIService, private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const game: GameNode = changes.game.currentValue;
    const roster = [...game.playerSet.edges, ...game.inviteSet.edges] as Maybe<PlayerNodeEdge & InviteNodeEdge>[];
    const inviteEmails = roster.filter((item) => item?.node?.email).map((item) => item?.node?.email);
    this.playerMemo = roster.reduce(this.memoizePlayers.bind(this)(inviteEmails), this.playerMemo);
  }

  memoizePlayers(inviteEmails: (string | undefined)[]) {
    return (
      players: { [key: string]: Maybe<PlayerNode & InviteNode & { profile: ProfileNode }> },
      player: Maybe<PlayerNodeEdge & InviteNodeEdge>,
    ) => {
      const node = player?.node;
      const providers = node?.user?.providerSet?.edges;
      const email = player?.node?.email?.toLowerCase();
      const playerData = providers?.reduce(
        (acc, p) =>
          merge(
            acc,
            merge({}, player?.node, {
              profile: p?.node?.profile,
              email: inviteEmails.includes(p?.node?.email) ? p?.node?.email : acc?.email ?? p?.node?.email ?? email,
            }),
          ),
        {} as Maybe<PlayerNode & InviteNode & { profile: ProfileNode }>,
      );
      const invitesData = email ? { [email]: player?.node } : {};
      const playersData = playerData?.email ? { [playerData?.email!]: playerData } : {};
      return merge({}, players, invitesData, playersData);
    };
  }

  removePlayer(player: PlayerNode) {}

  rescindInvite(player: PlayerNode & { email: string }) {}
}
