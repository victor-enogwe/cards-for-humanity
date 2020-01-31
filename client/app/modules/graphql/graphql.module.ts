import { NgModule } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { setContext } from 'apollo-link-context'
import { Apollo, ApolloModule } from 'apollo-angular'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { getCookie } from '../../utils/csrf'
import { Definintion } from '../../@types/global'
import { environment } from '../../../environments/environment'
import { AuthService } from '../../services/auth/auth.service'
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
  wsLink = new WebSocketLink({
    uri: environment.WS_LINK,
    options: { reconnect: true, connectionParams: { authToken: this.authService.token }, lazy: true }
  })
  link = this.apollo.create({
    link: split(
      this.queryKind,
      ApolloLink.from([this.basic, this.auth, this.error, this.httpLink]),
      this.wsLink,
    ),
    cache: this.cache.restore(window['__APOLLO_CLIENT__']),
    connectToDevTools: true,
    queryDeduplication: true,
    defaultOptions: { watchQuery: { errorPolicy: 'all' }, mutate: { errorPolicy: 'none' } }
  })

  constructor(private apollo: Apollo, private httpClient: HttpClient, private authService: AuthService) { }

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

  handleErrors({ graphQLErrors, networkError }) {
    console.log('here')
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
    }

    if (networkError) { console.log(`[Network error]: ${networkError}`) }
  }
}
