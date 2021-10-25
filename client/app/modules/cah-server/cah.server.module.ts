import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule } from '@angular/platform-server';
import { RouterModule, Routes } from '@angular/router';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { CahComponent } from 'client/app/components/shared/cah/cah.component';
import { CahShellComponent } from 'client/app/components/shared/shell/shell.component';
import { CahModule } from 'client/app/modules/cah/cah.module';

const routes: Routes = [{ path: 'shell', component: CahShellComponent }];

@NgModule({
  imports: [CahModule, ServerModule, ModuleMapLoaderModule, NoopAnimationsModule, RouterModule.forRoot(routes, {})],
  bootstrap: [CahComponent],
  declarations: [CahShellComponent],
})
export class CahServerModule {}
