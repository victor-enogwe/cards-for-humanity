import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BootstrapModule } from '../bootstrap/bootstrap.module'
import { CahRoutingModule } from '../routing/routing.module'
import { GraphqlModule } from '../graphql/graphql.module'
import { AuthModule } from '../auth/auth.module'

// components
import { CahComponent } from '../../components/cah/cah.component'

@NgModule({
  declarations: [CahComponent],
  imports: [
    BrowserModule,
    AuthModule,
    GraphqlModule,
    CahRoutingModule,
    BootstrapModule,
  ],
  bootstrap: [CahComponent]
})
export class CahModule { }
