import 'hammerjs'
import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { CahModule } from './app/modules/cah/cah.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

document.addEventListener('DOMContentLoaded', () => platformBrowserDynamic().bootstrapModule(CahModule).catch(console.error))
