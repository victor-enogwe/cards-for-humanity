import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BootstrapModule } from '../bootstrap/bootstrap.module'
import { CahRoutingModule } from '../routing/routing.module'
import { GraphqlModule } from '../graphql/graphql.module'

import { CahComponent } from '../../components/cah/cah.component'

@NgModule({
  declarations: [CahComponent],
  imports: [
    BrowserModule,
    GraphqlModule,
    CahRoutingModule,
    BootstrapModule,
  ],
  bootstrap: [CahComponent]
})
export class CahModule { }
