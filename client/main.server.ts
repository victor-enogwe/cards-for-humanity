import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { CahServerModule } from './app/modules/cah-server/cah.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
