import { Injectable } from '@angular/core';
import { BroadcastChannel, createLeaderElection, LeaderElector } from 'broadcast-channel';
import { BehaviorSubject } from 'rxjs';
import { BroadCast } from '../../@types/global';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private elector$ = new BehaviorSubject<LeaderElector | null>(null);
  private channel$ = new BehaviorSubject<BroadcastChannel<BroadCast> | null>(null);
  hasLeader$ = new BehaviorSubject<boolean>(false);
  isLeader$ = new BehaviorSubject<boolean>(false);

  get channel(): BroadcastChannel<BroadCast> {
    return this.channel$.getValue()!;
  }

  get elector(): LeaderElector {
    return this.elector$.getValue()!;
  }

  get hasLeader(): boolean {
    return this.hasLeader$.getValue();
  }

  get isLeader(): boolean {
    return this.isLeader$.getValue();
  }

  async createChannel(): Promise<BroadcastChannel<BroadCast>> {
    const channel: BroadcastChannel<BroadCast> = new BroadcastChannel('cah-broadcast', {
      webWorkerSupport: false,
      idb: { onclose: () => channel.close().then(() => this.createChannel()) },
    });
    const elector = createLeaderElection(channel, { fallbackInterval: 0, responseTime: 0 });
    this.channel$.next(channel);
    this.elector$.next(elector);
    return channel;
  }

  async electLeader() {
    await this.elector.awaitLeadership();
    this.hasLeader$.next(this.elector.hasLeader);
    this.isLeader$.next(this.elector.isLeader);
  }
}
