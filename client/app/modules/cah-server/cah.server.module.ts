import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'

import { CahModule } from '../cah/cah.module'
import { CahComponent } from '../../components/cah/cah.component'

@NgModule({
  imports: [
    CahModule,
    ServerModule,
  ],
  bootstrap: [CahComponent],
})
export class CahServerModule { }
