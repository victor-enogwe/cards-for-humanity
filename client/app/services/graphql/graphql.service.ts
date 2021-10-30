import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ApolloClientOptions, ApolloLink, FetchResult, InMemoryCache, NormalizedCacheObject, Observable, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ErrorLink, ErrorResponse } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Storage } from '@ionic/storage';
import { HttpLink } from 'apollo-angular/http';
import { createPersistedQueryLink } from 'apollo-angular/persisted-queries';
import { IonicStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { IntrospectionLink, resolvers, typeDefs, typePolicies } from 'client/app/graphql';
import possibleTypes from 'client/app/graphql/possible-types';
import { sha256 } from 'crypto-hash';
import { environment } from '../../../environments/environment';
import { Definition } from '../../@types/global';

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
  basic = setContext(() => ({ headers: { Accept: 'charset=utf-8' } }));
  auth = setContext(this.headers.bind(this));
  error = new ErrorLink(this.handleErrors.bind(this));
  persistedQueryLink = createPersistedQueryLink({ sha256 });
  httpLink = new HttpLink(this.httpClient).create({ uri: environment.HTTP_LINK, withCredentials: true });
  wsLink = this.ssr
    ? new ApolloLink()
    : new WebSocketLink({ uri: environment.WS_LINK, options: { reconnect: true, connectionParams: { authToken: '' }, lazy: true } });
  config: ApolloClientOptions<NormalizedCacheObject> = {
    link: ApolloLink.from([
      this.introspectionLink,
      this.persistedQueryLink,
      this.basic,
      this.auth,
      this.error,
      split(this.queryKind, this.wsLink, this.httpLink),
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

  constructor(private readonly storage: Storage, private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

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

  headers(_: any, { headers }: any): { headers: { [key: string]: string } } {
    return {
      headers: {
        ...headers,
        // Authorization: token ? `JWT ${token}` : null
      },
    };
  }

  handleErrors({ graphQLErrors, networkError, forward, operation }: ErrorResponse): Observable<FetchResult> | void {
    return new Observable((observer) => {
      const messages = graphQLErrors ? graphQLErrors.map(({ message }) => message).join('. \n') : networkError?.message;
      return observer.error(new Error(messages))
    });
  }
}
