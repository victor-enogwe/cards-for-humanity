import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { CahRoutingModule } from '../routing/routing.module'
import { GraphqlModule } from '../graphql/graphql.module'
import { AuthModule } from '../auth/auth.module'

// components
import { CahComponent } from '../../components/cah/cah.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [CahComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AuthModule,
    GraphqlModule,
    CahRoutingModule
  ],
  bootstrap: [CahComponent]
})
export class CahModule { }
