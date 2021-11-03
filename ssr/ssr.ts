/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import { CommonEngine, RenderOptions } from '@nguniversal/common/engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { resolve } from 'path';
import 'zone.js/node';

const { AppServerModule, LAZY_MODULE_MAP } = require('../client/main.server');

const [url] = process.argv.slice(2);

const documentFilePath = resolve(__dirname, '../browser/index.html');

const options: RenderOptions = {
  bootstrap: AppServerModule,
  url,
  inlineCriticalCss: true,
  documentFilePath,
  // publicPath: 'static/browser/',
  providers: [provideModuleMap(LAZY_MODULE_MAP)],
};

async function renderHtml(renderOptions: RenderOptions): Promise<boolean> {
  const engine = new CommonEngine(AppServerModule);
  return engine
    .render(renderOptions)
    .then((html) => process.stdout.write(html))
    .catch((error) => process.stderr.write(error));
}

renderHtml(options);
