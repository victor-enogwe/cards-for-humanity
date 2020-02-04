import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_BOOTSTRAP_LISTENER } from '@angular/core'
import { CahRoutingModule } from '../routing/routing.module'
import { GraphqlModule } from '../graphql/graphql.module'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { AuthModule } from '../auth/auth.module'

// components
import { CahComponent } from '../../components/cah/cah.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// services
import { SeoService } from '../../services/seo/seo.service'

const bootFactory = (seoService: SeoService) => seoService.start.bind(seoService)

@NgModule({
  declarations: [CahComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'cards-against-humanity' }),
    BrowserAnimationsModule,
    MatSnackBarModule,
    AuthModule,
    GraphqlModule,
    CahRoutingModule
  ],
  providers: [{ provide: APP_BOOTSTRAP_LISTENER, useFactory: bootFactory, multi: true, deps: [SeoService] }],
  bootstrap: [CahComponent]
})
export class CahModule { }
