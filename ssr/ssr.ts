import 'zone.js/dist/zone-node'
import { resolve } from 'path'
import { ɵCommonEngine, ɵRenderOptions } from '@nguniversal/common/engine'
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader'

const { CahServerModule, LAZY_MODULE_MAP } = require('../client/main.server')

const [url] = process.argv.slice(2)

const documentFilePath = resolve(__dirname, '../browser/index.html')

const options: ɵRenderOptions = {
    bootstrap: CahServerModule,
    url,
    documentFilePath,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
}

async function renderHtml(renderOptions: ɵRenderOptions): Promise<boolean> {
    const engine = new ɵCommonEngine(CahServerModule)
    return engine.render(renderOptions)
        .then(html => process.stdout.write(html))
        .catch(error => process.stderr.write(error))
}

renderHtml(options).catch(error => process.stderr.write(error))
