import { isPlatformServer } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Inject, NgModule, PLATFORM_ID } from '@angular/core'
import { FetchResult, from, InMemoryCache, Observable, split } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { ErrorResponse, onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { Apollo } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { createPersistedQueryLink } from 'apollo-angular/persisted-queries'
import { typeDefinitions } from 'client/app/graphql'
import { sha256 } from 'crypto-hash'
import { environment } from '../../../environments/environment'
import { Definition } from '../../@types/global'
import { AuthService } from '../../services/auth/auth.service'
import { NotificationService } from '../../services/notification/notification.service'
import { getCookie } from '../../utils/csrf'
import { APOLLO_CACHE } from '../cah/cah.module'


@NgModule({
  exports: [HttpClientModule],
})
export class GraphqlModule {
  basic = setContext(() => ({ headers: { Accept: 'charset=utf-8' } }))
  auth = setContext(this.headers.bind(this))
  error = onError(this.handleErrors.bind(this))
  persistedQueryLink = createPersistedQueryLink({ sha256 })
  httpLink = new HttpLink(this.httpClient).create({ uri: environment.HTTP_LINK, withCredentials: true })
  wsLink = isPlatformServer(this.platformId) ? () => null : new WebSocketLink({
    uri: environment.WS_LINK,
    options: { reconnect: true, connectionParams: { authToken: this.authService.token }, lazy: true }
  })
  client = this.apollo.create({
    link: this.persistedQueryLink.concat(split(
      this.queryKind,
      this.wsLink,
      from([this.error, this.basic, this.auth, this.httpLink]),
    )),
    cache: this.cache,
    connectToDevTools: !environment.production,
    queryDeduplication: true,
    typeDefs: typeDefinitions,
    // defaultOptions: { watchQuery: { errorPolicy: 'none' }, mutate: { errorPolicy: 'none' }, query: { errorPolicy: 'none' } }
  })

  constructor(
    private apollo: Apollo,
    private httpClient: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationService,
    @Inject(APOLLO_CACHE) private cache: InMemoryCache,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  queryKind({ query }: any): boolean {
    const { kind, operation }: Definition = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation !== 'subscription'
  }

  async headers(_: any, { headers }: any) {
    // const token = this.authService.token()
    return {
      headers: {
        ...headers,
        'X-CSRFToken': getCookie('csrftoken'),
        // Authorization: token ? `JWT ${token}` : null
      },
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

    // return throwError(Object.assign(networkError, graphQLErrors))
  }
}
