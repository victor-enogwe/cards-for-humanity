import { Injectable, NgZone } from '@angular/core';
import { BroadcastChannel, createLeaderElection, enforceOptions, LeaderElector, OnMessageHandler } from 'broadcast-channel';
import { BehaviorSubject } from 'rxjs';
import { BroadCast } from '../../@types/global';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private elector$ = new BehaviorSubject<LeaderElector | null>(null);
  private channel$ = new BehaviorSubject<BroadcastChannel<BroadCast> | null>(null);
  messages$ = new BehaviorSubject<BroadCast | null>(null);
  hasLeader$ = new BehaviorSubject<boolean>(false);
  isLeader$ = new BehaviorSubject<boolean>(false);
  listeners = new Map<BroadCast['event'], OnMessageHandler<BroadCast>[]>();

  constructor(private ngZone: NgZone) {
    const self = this;
    enforceOptions({
      webWorkerSupport: false,
      prepareDelay: 0,
      type: 'idb',
      idb: {
        onclose: function onClose(this: IDBDatabase, event: Event) {
          return self.onCloseIDB(this, event);
        } as () => any,
      },
    });
  }

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

  private async onCloseIDB(_idb: IDBDatabase, _event: Event) {
    return this.channel$
      .getValue()!
      .close()
      .then(() => this.createChannel());
  }

  private onMessage({ event, data, message }: BroadCast) {
    const listeners = this.listeners.get(event);
    listeners?.forEach((listener) => this.ngZone.run(() => listener?.call(this.channel, { event, data, message })));
  }

  addEventsListener<T>(event: BroadCast['event'], listener: OnMessageHandler<BroadCast<T>>) {
    const listeners = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...listeners, listener]);
  }

  async createChannel(): Promise<BroadcastChannel<BroadCast>> {
    const channel: BroadcastChannel<BroadCast> = new BroadcastChannel('cfh-broadcast');
    const elector = createLeaderElection(channel, { fallbackInterval: 2000, responseTime: 1000 });
    channel.onmessage = this.onMessage.bind(this);
    elector.onduplicate = () => console.info('duplicate tab leaders');
    this.channel$.next(channel);
    this.elector$.next(elector);
    return channel;
  }

  async electLeader() {
    return this.elector.applyOnce().then(() => {
      this.hasLeader$.next(this.elector.hasLeader);
      this.isLeader$.next(this.elector.isLeader);
      this.messages$.next({ event: 'tab-leader-election', message: `leader elected ${this.elector.hasLeader}` });
    });
  }
}
