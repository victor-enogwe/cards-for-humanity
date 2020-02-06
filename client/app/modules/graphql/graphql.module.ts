import * as localforage from 'localforage'
import { NgModule, PLATFORM_ID, Inject } from '@angular/core'
import { TransferState, makeStateKey, BrowserTransferStateModule } from '@angular/platform-browser'
import { TransferHttpCacheModule } from '@nguniversal/common'
import { HttpClientModule, HttpHeaders } from '@angular/common/http'
import { isPlatformServer } from '@angular/common'
import { setContext } from 'apollo-link-context'
import { Apollo, ApolloModule } from 'apollo-angular'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist-dev'
import { ApolloLink, FetchResult } from 'apollo-link'
import { onError, ErrorResponse } from 'apollo-link-error'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { throwError, Observable } from 'rxjs'
import { getCookie } from '../../utils/csrf'
import { Definintion } from '../../@types/global'
import { environment } from '../../../environments/environment'
import { AuthService } from '../../services/auth/auth.service'
import { NotificationService } from '../../services/notification/notification.service'
import * as mutations from '../../graphql/mutations'
import introspectionQueryResultData from '../../data/introspection.json'


@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule, BrowserTransferStateModule, TransferHttpCacheModule]
})
export class GraphqlModule {
  STATE_KEY = makeStateKey<any>('cah.state')
  fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData })
  basic = setContext(() => ({ headers: new HttpHeaders().set('Accept', 'charset=utf-8') }))
  auth = setContext(this.headers.bind(this))
  error = onError(this.handleErrors.bind(this))
  http = this.httpLink.create({ uri: environment.HTTP_LINK, withCredentials: true })
  cache = new InMemoryCache({
    addTypename: true,
    fragmentMatcher: this.fragmentMatcher,
    resultCaching: true,
    dataIdFromObject: this.dataIdFromObject
  })
  ws = isPlatformServer(this.platformId) ? undefined : new WebSocketLink({
    uri: environment.WS_LINK,
    options: { reconnect: true, connectionParams: { authToken: this.authService.token }, lazy: true }
  })
  normalizedCache = isPlatformServer(this.platformId) ? this.cache : this.cache.restore(this.transferState.get<any>(this.STATE_KEY, null))
  persistor = new CachePersistor({ cache: this.normalizedCache, storage: localforage, debug: !environment.production })
  client = this.apollo.create({
    link: split(
      this.queryKind,
      this.ws,
      ApolloLink.from([this.error, this.basic, this.auth, this.http]),
    ),
    cache: this.normalizedCache,
    ssrMode: true,
    ssrForceFetchDelay: 100,
    connectToDevTools: true,
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: { errorPolicy: 'none' },
      mutate: { errorPolicy: 'none' },
      query: { errorPolicy: 'none' }
    }
  })

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private authService: AuthService,
    private notificationService: NotificationService,
    private readonly transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.persistor.restore().then(() => this.restoreCacheSsr(isPlatformServer(this.platformId)))
  }

  queryKind({ query }): boolean {
    const { kind, operation }: Definintion = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  }

  async headers() {
    // const token = this.authService.token
    return new HttpHeaders({ 'X-CSRFToken': getCookie('csrftoken'), Authorization: null })
    // return {
    //   headers: Object.assign({ 'X-CSRFToken': getCookie('csrftoken') }, token ? { Authorization: token ? `JWT ${token}` : null } : {})
    // }
  }

  handleErrors(args: ErrorResponse): Observable<FetchResult> | void {
    const { graphQLErrors, networkError } = args
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => this.notificationService
        .notify(`[GraphQL error]: Message: ${message}`, 'dismiss'))
    }

    if (networkError) {
      this.notificationService.notify(`[Network error]: ${networkError}`, 'dismiss')
    }

    return throwError(Object.assign(networkError, graphQLErrors))
  }

  restoreCacheSsr(isServer: boolean) {
    if (isServer) {
      return this.transferState.onSerialize(this.STATE_KEY, () => this.cache.extract())
    }
  }

  dataIdFromObject(result: any) {
    const { id, token, __typename } = result
    switch (true) {
      case (token):
        return 'token'
      default:
        return `${__typename}:${id}`
    }
  }

  updateCache(cache: InMemoryCache, { data }) {
    const keys = Object.keys(data)
    console.log(keys)
    return keys.forEach(key => cache.writeQuery({ query: mutations[key], data: { [key]: data[key] } }))
  }
}
