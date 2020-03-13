/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    } else if (typeof define === "function" && define.amd) {
        define("@nguniversal/builders/src/ssr-dev-server/index", ["require", "exports", "@angular-devkit/architect", "@angular-devkit/core", "rxjs", "rxjs/operators", "@nguniversal/builders/src/ssr-dev-server/utils", "browser-sync", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    const architect_1 = require("@angular-devkit/architect");
    const core_1 = require("@angular-devkit/core");
    const rxjs_1 = require("rxjs");
    const operators_1 = require("rxjs/operators");
    const utils_1 = require("@nguniversal/builders/src/ssr-dev-server/utils");
    const browserSync = require("browser-sync");
    const path_1 = require("path");
    const url_1 = require("url")

    function execute(options, context) {
        const browserTarget = architect_1.targetFromTargetString(options.browserTarget);
        const serverTarget = architect_1.targetFromTargetString(options.serverTarget);
        const serverUrl = options.serverUrl;
        const serverPort = url_1.parse(serverUrl).port;
        const serverStartCommand = options.serverStartCommand
        const browserTargetRun = context.scheduleTarget(browserTarget, {
            extractCss: true,
            serviceWorker: false,
            watch: true,
            progress: options.progress,
        });
        const serverTargetRun = context.scheduleTarget(serverTarget, {
            watch: true,
            progress: options.progress,
        });
        context.logger.error(core_1.tags.stripIndents`
  ****************************************************************************************
  This is a simple server for use in testing or debugging Angular applications locally.
  It hasn't been reviewed for security issues.

  DON'T USE IT FOR PRODUCTION!
  ****************************************************************************************
 `);
        let bsInstance;
        return rxjs_1.zip(browserTargetRun, serverTargetRun).pipe(operators_1.switchMap(([br, sr]) => {
            const server$ = sr.output.pipe(operators_1.switchMap(s => {
                if (!s.success) {
                    return rxjs_1.of(s);
                }
                return (serverStartCommand ? startNodeServer(serverStartCommand) : rxjs_1.of(true)).pipe(operators_1.mapTo(s), operators_1.catchError(err => {
                    context.logger.error(`A server error has occurred.\n${mapErrorToMessage(err)}`);
                    return rxjs_1.NEVER;
                }));
            }));
            return rxjs_1.combineLatest(br.output, server$, rxjs_1.of(serverPort)).pipe(
                // This is needed so that if both server and browser emit close to each other
                // we only emit once. This typically happens on the first build.
                operators_1.debounceTime(100));
        }), operators_1.map(([b, s, serverPort]) => [{
            success: b.success && s.success,
            error: b.error || s.error,
        },
            serverPort,
        ]), operators_1.switchMap(([builderOutput, serverPort]) => {
            if (!builderOutput.success) {
                return rxjs_1.of(builderOutput);
            }
            if (!bsInstance) {
                return rxjs_1.from(startBrowserSync(serverPort, options, context.logger)).pipe(operators_1.tap(instance => bsInstance = instance), operators_1.mapTo(builderOutput));
            } else {
                bsInstance.reload();
                return rxjs_1.of(builderOutput);
            }
        }), operators_1.catchError(error => rxjs_1.of({
            success: false,
            error: mapErrorToMessage(error),
        })));
    }
    exports.execute = execute;

    function startNodeServer(serverStartCommand) {
        const env = Object.assign(Object.assign({}, process.env));
        return utils_1.execAsObservable(serverStartCommand, { env })
            .pipe(
                // Emit a signal after the process has been started
                operators_1.startWith(undefined), operators_1.mapTo(undefined));
    }

    function startBrowserSync(serverPort, options, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            const {
                port,
                open
            } = options;
            const bsPort = port || (yield utils_1.getAvailablePort());
            const instance = browserSync.init({
                proxy: `localhost:${serverPort}`,
                port: bsPort,
                ui: false,
                server: false,
                notify: false,
                ghostMode: false,
                logLevel: 'silent',
                open,
            });
            logger.info(core_1.tags.oneLine`
    **
    Angular Universal Live Development Server is listening on http://localhost:${bsPort},
    open your browser on http://localhost:${bsPort}
    **
  `);
            return instance;
        });
    }

    function mapErrorToMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === 'string') {
            return error;
        }
        return '';
    }
    exports.default = architect_1.createBuilder(execute);
});