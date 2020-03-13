import * as localforage from 'localforage'
import { NgModule, PLATFORM_ID, Inject } from '@angular/core'
import { HttpClientModule, HttpHeaders } from '@angular/common/http'
import { isPlatformServer } from '@angular/common'
import { setContext } from 'apollo-link-context'
import { Apollo, ApolloModule } from 'apollo-angular'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist-dev'
import { ApolloLink, FetchResult } from 'apollo-link'
import { onError, ErrorResponse } from 'apollo-link-error'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { withClientState } from 'apollo-link-state'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { AuthService } from 'angularx-social-login'
import { throwError, Observable } from 'rxjs'
import { getCookie } from '../../utils/csrf'
import { Definintion } from '../../@types/global'
import { environment } from '../../../environments/environment'
import { NotificationService } from '../../services/notification/notification.service'
import { typeDefs } from '../../graphql/types'
import { resolvers } from '../../graphql/resolvers'
import { socialAuth } from '../../graphql/redirects'
import * as queries from '../../graphql/queries'
import introspectionQueryResultData from '../../data/introspection.json'
import defaults from '../../data/defaults.json'

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphqlModule {
  static fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData })
  static cache = new InMemoryCache({
    addTypename: true,
    fragmentMatcher: GraphqlModule.fragmentMatcher,
    resultCaching: true,
    cacheRedirects: {
      Query: {
        socialAuth
      }
    }
  })
  static persistor = new CachePersistor({ cache: GraphqlModule.cache, storage: localforage, debug: !environment.production })
  context = setContext(this.headers.bind(this))
  error = onError(this.handleErrors.bind(this))
  http = this.httpLink.create({ uri: environment.HTTP_LINK, withCredentials: true })
  state = withClientState({ cache: GraphqlModule.cache, resolvers, defaults, typeDefs })
  persistedQuery = createPersistedQueryLink()
  ws = isPlatformServer(this.platformId) ? undefined : new WebSocketLink({
    uri: environment.WS_LINK,
    options: { reconnect: true, connectionParams: this.connectionParams, lazy: true }
  })
  transportLink = split(this.queryKind, this.ws, this.http)
  client = this.apollo.create({
    link: split(
      this.queryKind,
      this.ws,
      ApolloLink.from([this.state, this.context, this.persistedQuery, this.error, this.transportLink]),
    ),
    resolvers,
    cache: GraphqlModule.cache,
    ssrMode: true,
    ssrForceFetchDelay: 100,
    connectToDevTools: !environment.production,
    queryDeduplication: true,
    defaultOptions: { mutate: { update: this.updateCache } }
  })
  apolloClient = this.apollo.getClient()

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private apollo: Apollo,
    private httpLink: HttpLink,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.apolloClient.onResetStore(() => localforage.clear()
      .then(this.state.writeDefaults)
      .then(() => this.authService.signOut(true).catch(() => null)))
  }

  connectionParams() {
    try {
      return { authToken: `JWT ${this.apollo.getClient().readQuery({ query: queries.tokenAuth }).tokenAuth.token}` }
    } catch (error) {
      return { authToken: null }
    }
  }

  queryKind({ query }): boolean {
    const { kind, operation }: Definintion = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  }

  async headers() {
    return new HttpHeaders({
      'X-CSRFToken': getCookie('csrftoken'),
      Accept: 'charset=utf-8',
      Authorization: this.connectionParams().authToken
    })
  }

  handleErrors(args: ErrorResponse): Observable<FetchResult> | void {
    const { graphQLErrors, networkError } = args
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => this.notificationService
        .notify(message, 'dismiss'))
    }

    if (networkError) {
      this.notificationService.notify(networkError.message, 'dismiss')
    }
    return throwError(Object.assign(networkError || {}, graphQLErrors || {}))
  }

  updateCache(cache: InMemoryCache, { data }) {
    const keys = Object.keys(data)
    return keys.forEach(key => {
      switch (key) {
        case ('socialAuth'):
        case ('createUser'):
          return cache.writeQuery({
            query: queries.tokenAuth,
            data: { tokenAuth: { ...data[key], __typename: 'ObtainJSONWebTokenPayload' } }
          })
        default:
          return cache.writeQuery({ query: queries[key], data: { [key]: data[key] } })
      }
    })
  }
}
