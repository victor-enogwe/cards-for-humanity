import { Inject, Injectable } from '@angular/core';
import { BroadcastChannel } from 'broadcast-channel';
import { BehaviorSubject } from 'rxjs';
import { BroadCast } from '../../@types/global';
import { BROADCAST_CHANNEL_OBSERVER } from '../../modules/cah/cah.module';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  constructor(
    @Inject(BROADCAST_CHANNEL_OBSERVER) private observer$: BehaviorSubject<BroadcastChannel<BroadCast>>, // private applicationRef: ApplicationRef,
  ) {}

  get channel() {
    return this.observer$.getValue();
  }

  async createChannel(): Promise<BroadcastChannel<BroadCast>> {
    const channel: BroadcastChannel<BroadCast> = new BroadcastChannel('cah-broadcast', {
      webWorkerSupport: false,
      idb: { onclose: () => channel.close().then(() => this.createChannel()) },
    });
    channel.addEventListener('message', () => console.log('yea'));
    this.observer$.next(channel);

    return channel;
  }
}
