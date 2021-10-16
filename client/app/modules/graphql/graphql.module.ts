import { NgModule, PLATFORM_ID, Inject } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { isPlatformServer } from '@angular/common'
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache, FetchResult, split, from } from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws';
import { Apollo } from 'apollo-angular'
import { onError, ErrorResponse } from '@apollo/client/link/error';
import { HttpLink } from 'apollo-angular/http'
import {getMainDefinition} from '@apollo/client/utilities'
import { throwError, Observable } from 'rxjs'
import { getCookie } from '../../utils/csrf'
import { Definintion } from '../../@types/global'
import { environment } from '../../../environments/environment'
import { AuthService } from '../../services/auth/auth.service'
import { NotificationService } from '../../services/notification/notification.service'


@NgModule({
  exports: [HttpClientModule],
})
export class GraphqlModule {
  cache = new InMemoryCache({ addTypename: true })
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
      this.wsLink,
      from([this.error, this.basic, this.auth, this.httpLink]),
    ),
    cache: isPlatformServer(this.platformId) ? this.cache : this.cache.restore(window['__APOLLO_CLIENT__']),
    connectToDevTools: true,
    queryDeduplication: true,
    // defaultOptions: { watchQuery: { errorPolicy: 'none' }, mutate: { errorPolicy: 'none' }, query: { errorPolicy: 'none' } }
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

  async headers(_, { headers }) {
    // const token = this.authService.token()
    return {
      headers: {
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

    return throwError(Object.assign(networkError, graphQLErrors))
  }
}
