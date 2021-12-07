import { isPlatformServer } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ApolloClientOptions,
  ApolloLink,
  FetchResult,
  from,
  GraphQLRequest,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
  split,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Storage } from '@ionic/storage';
import { createPersistedQueryLink } from 'apollo-angular/persisted-queries';
import { IonicStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { sha256 } from 'crypto-hash';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { OperationOptions } from 'subscriptions-transport-ws';
import { environment } from '../../../environments/environment';
import { AnyObject, Definition } from '../../@types/global';
import { IntrospectionLink, resolvers, typeDefs, typePolicies } from '../../graphql';
import possibleTypes from '../../graphql/possible-types';
import { AUTH_TOKEN$ } from '../../modules/cah/cah.module';
import { WSSubscriptionClient } from '../../utils/ws';
import { HttpLinkService } from '../http-link/http-link.service';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  directives = 'directive @client on FIELD';
  cache: InMemoryCache = new InMemoryCache({
    canonizeResults: true,
    resultCaching: true,
    addTypename: true,
    typePolicies,
    possibleTypes: possibleTypes.possibleTypes,
  });
  ssr = isPlatformServer(this.platformId);
  introspectionLink = new IntrospectionLink();
  headersLink = setContext(this.httpHeaders.bind(this));
  errorLink = onError(this.handleErrors.bind(this));
  persistedQueryLink = createPersistedQueryLink({ sha256 });
  wsClient = new WSSubscriptionClient(environment.WS_LINK, { reconnect: true, lazy: true });
  wsLink = this.ssr ? new ApolloLink() : new WebSocketLink(this.wsClient.use([{ applyMiddleware: this.wsHeaders.bind(this) }]));
  link = from([
    this.introspectionLink,
    this.persistedQueryLink,
    this.headersLink,
    split(this.queryKind.bind(this), this.httpLink, this.wsLink),
  ]);
  config: ApolloClientOptions<NormalizedCacheObject> = {
    link: this.link,
    cache: this.cache,
    connectToDevTools: !environment.production,
    queryDeduplication: true,
    typeDefs,
    assumeImmutableResults: true,
    name: 'cah',
    version: '0.1',
    ssrMode: this.ssr,
    uri: environment.HTTP_LINK,
    resolvers,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        returnPartialData: true,
        errorPolicy: 'none',
      },
      mutate: {
        errorPolicy: 'none',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'none',
      },
    },
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(AUTH_TOKEN$) private auth_token$: BehaviorSubject<string | null>,
    private readonly storage: Storage,
    private httpLink: HttpLinkService,
    private cookieService: CookieService,
  ) {}

  async initCache() {
    return this.storage.create().then((store) =>
      persistCache({
        cache: this.cache,
        key: '__cah',
        debug: !environment.production,
        storage: new IonicStorageWrapper(store),
      }),
    );
  }

  queryKind({ query }: GraphQLRequest): boolean {
    const { kind, operation }: Definition = getMainDefinition(query);
    switch (kind) {
      case 'OperationDefinition':
        switch (operation) {
          case 'subscription':
            return false;
          default:
            return true;
        }
      default:
        return true;
    }
  }

  httpHeaders({ operationName }: GraphQLRequest, { headers: prevHeaders }: { headers?: AnyObject }): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      Accept: 'charset=utf-8',
      'Content-Type': 'application/json',
      'X-CSRFToken': this.cookieService.get('csrftoken'),
      ...prevHeaders,
    });

    switch (operationName) {
      case 'TokenAuth':
      case 'RefreshToken':
        return { headers };
      default:
        return { headers: headers.set('Authorization', `Bearer ${this.auth_token$.getValue()}`) };
    }
  }

  wsHeaders(_options: OperationOptions, next: Function): void {
    this.wsClient.protocols.next(['graphql-ws', String(this.auth_token$.getValue())]);
    return next();
  }

  handleErrors({ graphQLErrors, networkError }: ErrorResponse): Observable<FetchResult> | void {
    const messages = graphQLErrors ? graphQLErrors.map(({ message }) => message).join('. \n') : networkError?.message;
    throw new Error(messages);
  }
}
