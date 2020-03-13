/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import 'zone.js/dist/zone-node'
import 'reflect-metadata'
import '@angular/localize/init'
import { join, resolve, dirname } from 'path'
import { ɵCommonEngine, ɵRenderOptions } from '@nguniversal/common/engine'
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader'

const { CahServerModule, LAZY_MODULE_MAP } = require('../client/main.server')

// const loggers = ['log', 'error', 'info']

// loggers.forEach((logger: string) => console[logger] = undefined)

const [url] = process.argv.slice(2)

const staticDirectory = resolve(dirname(__filename), 'static')

const documentFilePath = join(staticDirectory, 'browser/index.html')

const options: ɵRenderOptions = {
    bootstrap: CahServerModule,
    url,
    documentFilePath,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
}

async function renderHtml(renderOptions: ɵRenderOptions): Promise<boolean> {
    try {
        const engine = new ɵCommonEngine(CahServerModule)
        const html = await engine.render(renderOptions)
        return process.stdout.write(html)
    } catch (error) {
        console.log(error)
        return process.stderr.write(error)
    }
}

renderHtml(options).catch(error => process.stderr.write(error))
