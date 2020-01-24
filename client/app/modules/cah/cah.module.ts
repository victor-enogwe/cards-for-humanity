import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { CarouselModule } from 'ngx-carousel-lib'
import { BootstrapModule } from '../bootstrap/bootstrap.module'
import { CahRoutingModule } from '../routing/routing.module'

import { CahComponent } from '../../components/cah/cah.component'
import { CardComponent } from '../../components/card/card.component'
import { SentenceCasePipe } from '../../pipes/sentencecase/sentencecase.pipe'
import { DeckComponent } from '../../components/deck/deck.component'

@NgModule({
  declarations: [
    CahComponent,
    CardComponent,
    SentenceCasePipe,
    DeckComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CahRoutingModule,
    ApolloModule,
    HttpLinkModule,
    CarouselModule,
    BootstrapModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:8000/graphql'
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [CahComponent]
})
export class CahModule { }
