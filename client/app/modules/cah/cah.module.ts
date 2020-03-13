import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_BOOTSTRAP_LISTENER, APP_INITIALIZER } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CahRoutingModule } from '../routing/routing.module'
import { GraphqlModule } from '../graphql/graphql.module'
import { AuthModule } from '../auth/auth.module'
import { MatSnackBarModule } from '@angular/material/snack-bar'

// components
import { CahComponent } from '../../components/cah/cah.component'
import { NavComponent } from '../..//components/nav/nav.component'

// services
import { SeoService } from '../../services/seo/seo.service'

const initFactory = () => () => GraphqlModule.persistor.restore()

const bootFactory = (seoService: SeoService) => () => seoService.start.bind(seoService)

@NgModule({
  declarations: [CahComponent, NavComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'cards-against-humanity' }),
    BrowserAnimationsModule,
    MatSnackBarModule,
    AuthModule,
    CahRoutingModule,
    GraphqlModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initFactory, multi: true },
    { provide: APP_BOOTSTRAP_LISTENER, useFactory: bootFactory, multi: true, deps: [SeoService] }
  ],
  bootstrap: [CahComponent]
})
export class CahModule { }
