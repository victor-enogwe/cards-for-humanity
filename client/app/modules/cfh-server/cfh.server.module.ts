import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule } from '@angular/platform-server';
import { RouterModule, Routes } from '@angular/router';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { CfhComponent } from '../../components/shared/cfh/cfh.component';
import { CfhShellComponent } from '../../components/shared/shell/shell.component';
import { CfhModule } from '../cfh/cfh.module';

const routes: Routes = [{ path: 'shell', component: CfhShellComponent }];

@NgModule({
  imports: [CfhModule, ServerModule, ModuleMapLoaderModule, NoopAnimationsModule, RouterModule.forRoot(routes, {})],
  bootstrap: [CfhComponent],
  declarations: [CfhShellComponent],
})
export class CfhServerModule {}
