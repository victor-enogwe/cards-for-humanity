import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { CahModule } from '../cah/cah.module';
import { CahComponent } from '../../components/shared/cah/cah.component';

@NgModule({
  imports: [CahModule, ServerModule, ModuleMapLoaderModule],
  bootstrap: [CahComponent],
})
export class CahServerModule {}
