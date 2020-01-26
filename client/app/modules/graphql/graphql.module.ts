import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { setContext } from 'apollo-link-context'
import { Apollo, ApolloModule } from 'apollo-angular'
import { ApolloLink } from 'apollo-link'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { getCookie } from '../../utils/csrf'
import { Definintion } from '../../@types/global'
import { environment } from '../../../environments/environment'



@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphqlModule {
  basic = setContext((operation, context) => ({ headers: { Accept: 'charset=utf-8' } }))
  auth = setContext(this.headers)
  httpLink = new HttpLink(this.httpClient).create({ uri: environment.HTTP_LINK, withCredentials: true })
  wsLink = new WebSocketLink({
    uri: environment.WS_LINK,
    options: { reconnect: true, connectionParams: { authToken: this.token() } }
  })
  link = this.apollo.create({
    link: split(
      this.queryKind,
      this.wsLink,
      ApolloLink.from([this.basic, this.auth, this.httpLink]),
    ),
    cache: new InMemoryCache()
  })

  constructor(private apollo: Apollo, private httpClient: HttpClient) { }

  queryKind({ query }) {
    const { kind, operation }: Definintion = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  }

  async token() {
    // Grab token if there is one in storage or hasn't expired
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   // An observable to fetch a new token
    //   // Converted .toPromise()
    //   // await this.auth.acquireToken().toPromise()

    //   // Set new token to the response (adal puts the new token in storage when fetched)
    //   // token = this.auth.getCachedAccessToken()
    // }
    return localStorage.getItem('token')
  }

  async headers(_, { headers }) {
    const token = await this.token()
    return {
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        Authorization: token ? `JWT ${token}` : null
      },
    }
  }
}
