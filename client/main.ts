import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CfhModule } from './app/modules/cfh/cfh.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // ['info', 'error', 'log', 'warn'].forEach(logger => (console[logger] = undefined))
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(CfhModule)
    .catch((err) => console.error(err));
});
