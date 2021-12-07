import { ExecutionResult } from 'graphql';
import { BehaviorSubject, skip } from 'rxjs';
import { ClientOptions, Observable, OperationOptions, SubscriptionClient } from 'subscriptions-transport-ws';

export class WSSubscriptionClient extends SubscriptionClient {
  protocols = new BehaviorSubject<string[]>(['graphql-ws']);

  constructor(url: string, options?: ClientOptions, webSocketImpl?: WebSocket, webSocketProtocols?: string | string[]) {
    super(url, options, webSocketImpl, webSocketProtocols);

    this.protocols.pipe(skip(1)).subscribe((wsProtocols) => {
      Object.assign(this, { wsProtocols });
      this.close(false);
    });
  }

  public request(request: OperationOptions): Observable<ExecutionResult> {
    return super.request(request);
  }
}
