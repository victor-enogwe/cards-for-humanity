import { ExecutionResult } from 'graphql';
import { BehaviorSubject, filter } from 'rxjs';
import { ClientOptions, Observable, OperationOptions, SubscriptionClient } from 'subscriptions-transport-ws';

export class WSSubscriptionClient extends SubscriptionClient {
  constructor(
    url: string,
    private token$: BehaviorSubject<string | null>,
    options?: ClientOptions,
    webSocketImpl?: WebSocket,
    webSocketProtocols?: string | string[],
  ) {
    super(url, options, webSocketImpl, webSocketProtocols);

    this.token$.pipe(filter((token) => Boolean(token))).subscribe((token) => {
      Object.assign(this, { wsProtocols: ['graphql-ws', token] });
      this.close(false);
    });
  }

  public request(request: OperationOptions): Observable<ExecutionResult> {
    return super.request(request);
  }
}
