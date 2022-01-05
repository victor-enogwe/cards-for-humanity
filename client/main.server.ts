import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { renderModule, renderModuleFactory } from '@angular/platform-server';
export { CfhServerModule as AppServerModule } from './app/modules/cfh-server/cfh.server.module';
