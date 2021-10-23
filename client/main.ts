import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CahModule } from './app/modules/cah/cah.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // ['info', 'error', 'log', 'warn'].forEach(logger => (console[logger] = undefined))
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(CahModule)
    .catch((err) => console.error(err));
});
