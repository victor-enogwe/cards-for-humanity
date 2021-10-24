import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ApolloClientOptions,
  ApolloLink,
  FetchResult,
  from,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
  split,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Storage } from '@ionic/storage-angular';
import { HttpLink } from 'apollo-angular/http';
import { createPersistedQueryLink } from 'apollo-angular/persisted-queries';
import { IonicStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { IntrospectionLink, resolvers, typeDefs, typePolicies } from 'client/app/graphql';
import possibleTypes from 'client/app/graphql/possible-types';
import { sha256 } from 'crypto-hash';
import { environment } from '../../../environments/environment';
import { Definition } from '../../@types/global';
import { NotificationService } from '../../services/notification/notification.service';
import { getCookie } from '../../utils/csrf';

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
  introspectionLink = new IntrospectionLink();
  basic = setContext(() => ({ headers: { Accept: 'charset=utf-8' } }));
  auth = setContext(this.headers.bind(this));
  error = onError(this.handleErrors.bind(this));
  persistedQueryLink = createPersistedQueryLink({ sha256 });
  httpLink = new HttpLink(this.httpClient).create({ uri: environment.HTTP_LINK, withCredentials: true });
  wsLink = isPlatformServer(this.platformId)
    ? () => null
    : new WebSocketLink({
        uri: environment.WS_LINK,
        options: { reconnect: true, connectionParams: { authToken: '' }, lazy: true },
      });
  config: ApolloClientOptions<NormalizedCacheObject> = {
    link: ApolloLink.from([
      this.introspectionLink,
      this.persistedQueryLink,
      split(this.queryKind, this.wsLink, from([this.error, this.basic, this.auth, this.httpLink])),
    ]),
    cache: this.cache,
    connectToDevTools: !environment.production,
    queryDeduplication: true,
    typeDefs,
    assumeImmutableResults: true,
    resolvers,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        returnPartialData: true,
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    },
  };

  constructor(
    private readonly storage: Storage,
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: object,
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

  queryKind({ query }: any): boolean {
    const { kind, operation }: Definition = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation !== 'subscription';
  }

  async headers(_: any, { headers }: any) {
    return {
      headers: {
        ...headers,
        'X-CSRFToken': getCookie('csrftoken'),
        // Authorization: token ? `JWT ${token}` : null
      },
    };
  }

  handleErrors(args: ErrorResponse): Observable<FetchResult> | void {
    const { graphQLErrors, networkError } = args;
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        this.notificationService.notify(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`, 'dismiss'),
      );
    }

    if (networkError) {
      this.notificationService.notify(`[Network error]: ${networkError}`, 'dismiss');
      console.log(`[Network error]: ${networkError}`);
    }
  }
}
