import { NgModule } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'

import { CahModule } from '../cah/cah.module'
import { CahComponent } from '../../components/cah/cah.component'

@NgModule({
  imports: [
    CahModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
  ],
  bootstrap: [CahComponent],
})
export class CahServerModule { }
