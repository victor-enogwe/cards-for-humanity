import { NgModule, PLATFORM_ID, Inject } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { isPlatformServer } from '@angular/common'
import { setContext } from 'apollo-link-context'
import { Apollo, ApolloModule } from 'apollo-angular'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
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
import introspectionQueryResultData from '../../data/introspection.json'


@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphqlModule {
  fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData })
  cache = new InMemoryCache({ addTypename: true, fragmentMatcher: this.fragmentMatcher })
  basic = setContext(() => ({ headers: { Accept: 'charset=utf-8' } }))
  auth = setContext(this.headers.bind(this))
  error = onError(this.handleErrors.bind(this))
  httpLink = new HttpLink(this.httpClient).create({ uri: environment.HTTP_LINK, withCredentials: true })
  wsLink = isPlatformServer(this.platformId) ? undefined : new WebSocketLink({
    uri: environment.WS_LINK,
    options: { reconnect: true, connectionParams: { authToken: this.authService.token }, lazy: true }
  })
  link = this.apollo.create({
    link: split(
      this.queryKind,
      ApolloLink.from([this.error, this.basic, this.auth, this.httpLink]),
      this.wsLink
    ),
    cache: isPlatformServer(this.platformId) ? this.cache : this.cache.restore(window['__APOLLO_CLIENT__']),
    connectToDevTools: true,
    queryDeduplication: true,
    defaultOptions: { watchQuery: { errorPolicy: 'none' }, mutate: { errorPolicy: 'none' }, query: { errorPolicy: 'none' } }
  })

  constructor(
    private apollo: Apollo,
    private httpClient: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) { }

  queryKind({ query }): boolean {
    const { kind, operation }: Definintion = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation !== 'subscription'
  }

  async headers() {
    const token = this.authService.token
    return {
      headers: Object.assign({ 'X-CSRFToken': getCookie('csrftoken') }, token ? { Authorization: token ? `JWT ${token}` : null } : {})
    }
  }

  handleErrors(args: ErrorResponse): Observable<FetchResult> | void {
    const { graphQLErrors, networkError } = args
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => this.notificationService
        .notify(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`, 'dismiss'))
    }

    if (networkError) {
      this.notificationService.notify(`[Network error]: ${networkError}`, 'dismiss')
      console.log(`[Network error]: ${networkError}`)
    }

    return throwError(Object.assign(networkError, graphQLErrors))
  }
}
