"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const architect_1 = require("@angular-devkit/architect");
const core_1 = require("@angular-devkit/core");
const browserSync = __importStar(require("browser-sync"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const url = __importStar(require("url"));
const utils_1 = require('@nguniversal/builders/src/ssr-dev-server/utils');
/** Log messages to ignore and not rely to the logger */
const IGNORED_STDOUT_MESSAGES = [
    'server listening on',
    'Angular is running in development mode. Call enableProdMode() to enable production mode.',
];
function execute(options, context) {
    var _a;
    const browserTarget = (0, architect_1.targetFromTargetString)(options.browserTarget);
    const serverTarget = (0, architect_1.targetFromTargetString)(options.serverTarget);
    const serverStartCommand = (_a = options.serverStartCommand) !== null && _a !== void 0 ? _a : '';
    const getBaseUrl = (bs) => `${bs.getOption('scheme')}://${bs.getOption('host')}:${bs.getOption('port')}`;
    const browserTargetRun = context.scheduleTarget(browserTarget, {
        serviceWorker: false,
        watch: true,
        progress: options.progress,
    });
    const serverTargetRun = context.scheduleTarget(serverTarget, {
        watch: true,
        progress: options.progress,
    });
    const bsInstance = browserSync.create();
    const serverErrorMessage = 'A server error has occurred.';
    context.logger.error(core_1.tags.stripIndents `
  ****************************************************************************************
  This is a simple server for use in testing or debugging Angular applications locally.
  It hasn't been reviewed for security issues.

  DON'T USE IT FOR PRODUCTION!
  ****************************************************************************************
 `);
    return (0, rxjs_1.zip)(browserTargetRun, serverTargetRun, (0, utils_1.getAvailablePort)()).pipe((0, operators_1.switchMap)(([br, sr, serverPort]) => {
        return (0, rxjs_1.combineLatest)([br.output, sr.output]).pipe(
        // This is needed so that if both server and browser emit close to each other
        // we only emit once. This typically happens on the first build.
        (0, operators_1.debounceTime)(120), (0, operators_1.switchMap)(([b, s]) => {
            if (!s.success || !b.success) {
                return (0, rxjs_1.of)([b, s]);
            }
            return (0, rxjs_1.iif)(() => (serverStartCommand === null || serverStartCommand === void 0 ? void 0 : serverStartCommand.length) > 0, startNodeServer(s, serverPort, context.logger, !!options.inspect).pipe((0, operators_1.mapTo)([b, s]), (0, operators_1.catchError)((err) => {
                context.logger.error(`${serverErrorMessage}\n${mapErrorToMessage(err)}`);
                return rxjs_1.EMPTY;
            })), startServer(serverStartCommand).pipe((0, operators_1.mapTo)([b, s]), (0, operators_1.catchError)(err => {
                context.logger.error(`${serverErrorMessage}\n${mapErrorToMessage(err)}`);
                return rxjs_1.EMPTY;
            })));
        }), (0, operators_1.map)(([b, s]) => [
            {
                success: b.success && s.success,
                error: b.error || s.error,
            },
            serverPort,
        ]), (0, operators_1.tap)(([builderOutput]) => {
            if (builderOutput.success) {
                context.logger.info('\nCompiled successfully.');
            }
        }), (0, operators_1.debounce)(([builderOutput]) => builderOutput.success && !options.inspect
            ? (0, utils_1.waitUntilServerIsListening)(serverPort)
            : rxjs_1.EMPTY));
    }), (0, operators_1.concatMap)(([builderOutput, serverPort]) => {
        if (!builderOutput.success) {
            return (0, rxjs_1.of)(builderOutput);
        }
        if (bsInstance.active) {
            bsInstance.reload();
            return (0, rxjs_1.of)(builderOutput);
        }
        else {
            return (0, rxjs_1.from)(initBrowserSync(bsInstance, serverPort, options, context)).pipe((0, operators_1.tap)((bs) => {
                const baseUrl = getBaseUrl(bs);
                context.logger.info(core_1.tags.oneLine `
                **
                Angular Universal Live Development Server is listening on ${baseUrl},
                open your browser on ${baseUrl}
                **
              `);
            }), (0, operators_1.mapTo)(builderOutput));
        }
    }), (0, operators_1.map)((builderOutput) => ({
        success: builderOutput.success,
        error: builderOutput.error,
        baseUrl: bsInstance && getBaseUrl(bsInstance),
    })), (0, operators_1.finalize)(() => {
        if (bsInstance) {
            bsInstance.exit();
            bsInstance.cleanup();
        }
    }), (0, operators_1.catchError)((error) => (0, rxjs_1.of)({
        success: false,
        error: mapErrorToMessage(error),
    })));
}
exports.execute = execute;
function startNodeServer(serverOutput, port, logger, inspectMode = false) {
    const outputPath = serverOutput.outputPath;
    const path = (0, path_1.join)(outputPath, 'main.js');
    const env = { ...process.env, PORT: '' + port };
    const args = [`"${path}"`];
    if (inspectMode) {
        args.unshift('--inspect-brk');
    }
    return (0, rxjs_1.of)(null).pipe((0, operators_1.delay)(0), // Avoid EADDRINUSE error since it will cause the kill event to be finish.
    (0, operators_1.switchMap)(() => (0, utils_1.spawnAsObservable)('node', args, { env, shell: true })), (0, operators_1.tap)(({ stderr, stdout }) => {
        if (stderr) {
            logger.error(stderr);
        }
        if (stdout && !IGNORED_STDOUT_MESSAGES.some((x) => stdout.includes(x))) {
            logger.info(stdout);
        }
    }), (0, operators_1.ignoreElements)(),
    // Emit a signal after the process has been started
    (0, operators_1.startWith)(undefined));
}
function startServer(serverStartCommand) {
    const env = Object.assign(Object.assign({}, process.env));
    return (0, utils_1.spawnAsObservable)(serverStartCommand, [], { env })
        .pipe((0, operators_1.startWith)(undefined), (0, operators_1.mapTo)(undefined));
}
async function initBrowserSync(browserSyncInstance, serverPort, options, context) {
    if (browserSyncInstance.active) {
        return browserSyncInstance;
    }
    const { port: browserSyncPort, open, host, publicHost, proxyConfig } = options;
    const bsPort = browserSyncPort || (await (0, utils_1.getAvailablePort)());
    const bsOptions = {
        proxy: {
            target: `localhost:${serverPort}`,
            proxyOptions: {
                xfwd: true,
            },
            proxyRes: [
                (proxyRes) => {
                    if ('headers' in proxyRes) {
                        proxyRes.headers['cache-control'] = undefined;
                    }
                },
            ],
            // proxyOptions is not in the typings
        },
        host,
        port: bsPort,
        ui: false,
        server: false,
        notify: false,
        ghostMode: false,
        logLevel: 'silent',
        open,
        https: getSslConfig(context.workspaceRoot, options),
    };
    const publicHostNormalized = publicHost && publicHost.endsWith('/')
        ? publicHost.substring(0, publicHost.length - 1)
        : publicHost;
    if (publicHostNormalized) {
        const { protocol, hostname, port, pathname } = url.parse(publicHostNormalized);
        const defaultSocketIoPath = '/browser-sync/socket.io';
        const defaultNamespace = '/browser-sync';
        const hasPathname = !!(pathname && pathname !== '/');
        const namespace = hasPathname ? pathname + defaultNamespace : defaultNamespace;
        const path = hasPathname ? pathname + defaultSocketIoPath : defaultSocketIoPath;
        bsOptions.socket = {
            namespace,
            path,
            domain: url.format({
                protocol,
                hostname,
                port,
            }),
        };
        // When having a pathname we also need to create a reverse proxy because socket.io
        // will be listening on: 'http://localhost:4200/ssr/browser-sync/socket.io'
        // However users will typically have a reverse proxy that will redirect all matching requests
        // ex: http://testinghost.com/ssr -> http://localhost:4200 which will result in a 404.
        if (hasPathname) {
            // Remove leading slash
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (bsOptions.scriptPath = (p) => p.substring(1)),
                (bsOptions.middleware = [
                    (0, http_proxy_middleware_1.createProxyMiddleware)(defaultSocketIoPath, {
                        target: url.format({
                            protocol: 'http',
                            hostname: host,
                            port: bsPort,
                            pathname: path,
                        }),
                        ws: true,
                        logLevel: 'silent',
                    }),
                ]);
        }
    }
    if (proxyConfig) {
        if (!bsOptions.middleware) {
            bsOptions.middleware = [];
        }
        else if (!Array.isArray(bsOptions.middleware)) {
            bsOptions.middleware = [bsOptions.middleware];
        }
        bsOptions.middleware = [
            ...bsOptions.middleware,
            ...getProxyConfig(context.workspaceRoot, proxyConfig),
        ];
    }
    return new Promise((resolve, reject) => {
        browserSyncInstance.init(bsOptions, (error, bs) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(bs);
            }
        });
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
function getSslConfig(root, options) {
    const { ssl, sslCert, sslKey } = options;
    if (ssl && sslCert && sslKey) {
        return {
            key: (0, path_1.resolve)(root, sslKey),
            cert: (0, path_1.resolve)(root, sslCert),
        };
    }
    return ssl;
}
function getProxyConfig(root, proxyConfig) {
    const proxyPath = (0, path_1.resolve)(root, proxyConfig);
    let proxySettings;
    try {
        proxySettings = require(proxyPath);
    }
    catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            throw new Error(`Proxy config file ${proxyPath} does not exist.`);
        }
        throw error;
    }
    const proxies = Array.isArray(proxySettings) ? proxySettings : [proxySettings];
    return proxies.map((proxy) => {
        const keys = Object.keys(proxy);
        const context = keys[0];
        if (keys.length === 1 || typeof context === 'string') {
            const normalizedContext = context.replace(/^\*$/, '**').replace(/\/\*$/, '');
            return (0, http_proxy_middleware_1.createProxyMiddleware)(normalizedContext, proxy[context]);
        }
        return (0, http_proxy_middleware_1.createProxyMiddleware)(proxy);
    });
}
exports.default = (0, architect_1.createBuilder)(execute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2J1aWxkZXJzL3NyYy9zc3ItZGV2LXNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgseURBS21DO0FBQ25DLCtDQUEyRDtBQUMzRCwwREFBNEM7QUFDNUMsaUVBQThEO0FBQzlELCtCQUFvRDtBQUNwRCwrQkFBNEU7QUFDNUUsOENBYXdCO0FBQ3hCLHlDQUEyQjtBQUczQixtQ0FBMEY7QUFFMUYsd0RBQXdEO0FBQ3hELE1BQU0sdUJBQXVCLEdBQUc7SUFDOUIscUJBQXFCO0lBQ3JCLDBGQUEwRjtDQUMzRixDQUFDO0FBT0YsU0FBZ0IsT0FBTyxDQUNyQixPQUFtQyxFQUNuQyxPQUF1Qjs7SUFFdkIsTUFBTSxhQUFhLEdBQUcsSUFBQSxrQ0FBc0IsRUFBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEUsTUFBTSxZQUFZLEdBQUcsSUFBQSxrQ0FBc0IsRUFBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEUsTUFBTSxrQkFBa0IsR0FBRyxNQUFBLE9BQU8sQ0FBQyxrQkFBa0IsbUNBQUksRUFBRSxDQUFBO0lBQzNELE1BQU0sVUFBVSxHQUFHLENBQUMsRUFBbUMsRUFBRSxFQUFFLENBQ3pELEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNoRixNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFO1FBQzdELGFBQWEsRUFBRSxLQUFLO1FBQ3BCLEtBQUssRUFBRSxJQUFJO1FBQ1gsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO0tBQzNCLENB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QkFBaUIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTdFLE9BQU8sSUFBQSw2Q0FBcUIsRUFBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQVEsQ0FBQztTQUN4RTtRQUVELE9BQU8sSUFBQSw2Q0FBcUIsRUFBQyxLQUFLLENBQVEsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxrQkFBZSxJQUFBLHlCQUFhLEVBQTRDLE9BQU8sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEJ1aWxkZXJDb250ZXh0LFxuICBCdWlsZGVyT3V0cHV0LFxuICBjcmVhdGVCdWlsZGVyLFxuICB0YXJnZXRGcm9tVGFyZ2V0U3RyaW5nLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvYXJjaGl0ZWN0JztcbmltcG9ydCB7IGpzb24sIGxvZ2dpbmcsIHRhZ3MgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgKiBhcyBicm93c2VyU3luYyBmcm9tICdicm93c2VyLXN5bmMnO1xuaW1wb3J0IHsgY3JlYXRlUHJveHlNaWRkbGV3YXJlIH0gZnJvbSAnaHR0cC1wcm94eS1taWRkbGV3YXJlJztcbmltcG9ydCB7IGpvaW4sIHJlc29sdmUgYXMgcGF0aFJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlLCBjb21iaW5lTGF0ZXN0LCBmcm9tLCBpaWYsIG9mLCB6aXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNhdGNoRXJyb3IsXG4gIGNvbmNhdE1hcCxcbiAgZGVib3VuY2UsXG4gIGRlYm91bmNlVGltZSxcbiAgZGVsYXksXG4gIGZpbmFsaXplLFxuICBpZ25vcmVFbGVtZW50cyxcbiAgbWFwLFxuICBtYXBUbyxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG4gIHRhcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmltcG9ydCB7IGdldEF2YWlsYWJsZVBvcnQsIHNwYXduQXNPYnNlcnZhYmxlLCB3YWl0VW50aWxTZXJ2ZXJJc0xpc3RlbmluZyB9IGZyb20gJy4vdXRpbHMnO1xuXG4vKiogTG9nIG1lc3NhZ2VzIHRvIGlnbm9yZSBhbmQgbm90IHJlbHkgdG8gdGhlIGxvZ2dlciAqL1xuY29uc3QgSUdOT1JFRF9TVERPVVRfTUVTU0FHRVMgPSBbXG4gICdzZXJ2ZXIgbGlzdGVuaW5nIG9uJyxcbiAgJ0FuZ3VsYXIgaXMgcnVubmluZyBpbiBkZXZlbG9wbWVudCBtb2RlLiBDYWxsIGVuYWJsZVByb2RNb2RlKCkgdG8gZW5hYmxlIHByb2R1Y3Rpb24gbW9kZS4nLFxuXTtcblxuZXhwb3J0IHR5cGUgU1NSRGV2U2VydmVyQnVpbGRlck9wdGlvbnMgPSBTY2hlbWEgJiBqc29uLkpzb25PYmplY3Q7XG5leHBvcnQgdHlwZSBTU1JEZXZTZXJ2ZXJCdWlsZGVyT3V0cHV0ID0gQnVpbGRlck91dHB1dCAmIHtcbiAgYmFzZVVybD86IHN0cmluZztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlKFxuICBvcHRpb25zOiBTU1JEZXZTZXJ2ZXJCdWlsZGVyT3B0aW9ucyxcbiAgY29udGV4dDogQnVpbGRlckNvbnRleHQsXG4pOiBPYnNlcnZhYmxlPFNTUkRldlNlcnZlckJ1aWxkZXJPdXRwdXQ+IHtcbiAgY29uc3QgYnJvd3NlclRhcmdldCA9IHRhcmdldEZyb21UYXJnZXRTdHJpbmcob3B0aW9ucy5icm93c2VyVGFyZ2V0KTtcbiAgY29uc3Qgc2VydmVyVGFyZ2V0ID0gdGFyZ2V0RnJvbVRhcmdldFN0cmluZyhvcHRpb25zLnNlcnZlclRhcmdldCk7XG4gIGNvbnN0IHNlcnZlclN0YXJ0Q29tbWFuZCA9IG9wdGlvbnMuc2VydmVyU3RhcnRDb21tYW5kID8/ICcnXG4gIGNvbnN0IGdldEJhc2VVcmwgPSAoYnM6IGJyb3dzZXJTeW5jLkJyb3dzZXJTeW5jSW5zdGFuY2UpID0+XG4gICAgYCR7YnMuZ2V0T3B0aW9uKCdzY2hlbWUnKX06Ly8ke2JzLmdldE9wdGlvbignaG9zdCcpfToke2JzLmdldE9wdGlvbigncG9ydCcpfWA7XG4gIGNvbnN0IGJyb3dzZXJUYXJnZXRSdW4gPSBjb250ZXh0LnNjaGVkdWxlVGFyZ2V0KGJyb3dzZXJUYXJnZXQsIHtcbiAgICBzZXJ2aWNlV29ya2VyOiBmYWxzZSxcbiAgICB3YXRjaDogdHJ1ZSxcbiAgICBwcm9ncmVzczogb3B0aW9ucy5wcm9ncmVzcyxcbiAgfSk7XG5cbiAgY29uc3Qgc2VydmVyVGFyZ2V0UnVuID0gY29udGV4dC5zY2hlZHVsZVRhcmdldChzZXJ2ZXJUYXJnZXQsIHtcbiAgICB3YXRjaDogdHJ1ZSxcbiAgICBwcm9ncmVzczogb3B0aW9ucy5wcm9ncmVzcyxcbiAgfSk7XG5cbiAgY29uc3QgYnNJbnN0YW5jZSA9IGJyb3dzZXJTeW5jLmNyZWF0ZSgpO1xuICBjb25zdCBzZXJ2ZXJFcnJvck1lc3NhZ2UgPSAnQSBzZXJ2ZXIgZXJyb3IgaGFzIG9jY3VycmVkLidcblxuICBjb250ZXh0LmxvZ2dlci5lcnJvcih0YWdzLnN0cmlwSW5kZW50c2BcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBUaGlzIGlzIGEgc2ltcGxlIHNlcnZlciBmb3IgdXNlIGluIHRlc3Rpbmcgb3IgZGVidWdnaW5nIEFuZ3VsYXIgYXBwbGljYXRpb25zIGxvY2FsbHkuXG4gIEl0IGhhc24ndCBiZWVuIHJldmlld2VkIGZvciBzZWN1cml0eSBpc3N1ZXMuXG5cbiAgRE9OJ1QgVVNFIElUIEZPUiBQUk9EVUNUSU9OIVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gYCk7XG5cbiAgcmV0dXJuIHppcChicm93c2VyVGFyZ2V0UnVuLCBzZXJ2ZXJUYXJnZXRSdW4sIGdldEF2YWlsYWJsZVBvcnQoKSkucGlwZShcbiAgICBzd2l0Y2hNYXAoKFticiwgc3IsIHNlcnZlclBvcnRdKSA9PiB7XG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdChbYnIub3V0cHV0LCBzci5vdXRwdXRdKS5waXBlKFxuICAgICAgICAvLyBUaGlzIGlzIG5lZWRlZCBzbyB0aGF0IGlmIGJvdGggc2VydmVyIGFuZCBicm93c2VyIGVtaXQgY2xvc2UgdG8gZWFjaCBvdGhlclxuICAgICAgICAvLyB3ZSBvbmx5IGVtaXQgb25jZS4gVGhpcyB0eXBpY2FsbHkgaGFwcGVucyBvbiB0aGUgZmlyc3QgYnVpbGQuXG4gICAgICAgIGRlYm91bmNlVGltZSgxMjApLFxuICAgICAgICBzd2l0Y2hNYXAoKFtiLCBzXSkgPT4ge1xuICAgICAgICAgIGlmICghcy5zdWNjZXNzIHx8ICFiLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBvZihbYiwgc10pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBpaWYoXG4gICAgICAgICAgICAoKSA9PiBzZXJ2ZXJTdGFydENvbW1hbmQ/Lmxlbmd0aCA+IDAsXG4gICAgICAgICAgICBzdGFydE5vZGVTZXJ2ZXIocywgc2VydmVyUG9ydCwgY29udGV4dC5sb2dnZXIsICEhb3B0aW9ucy5pbnNwZWN0KS5waXBlKFxuICAgICAgICAgICAgICBtYXBUbyhbYiwgc10pLFxuICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxvZ2dlci5lcnJvcihgJHtzZXJ2ZXJFcnJvck1lc3NhZ2V9XFxuJHttYXBFcnJvclRvTWVzc2FnZShlcnIpfWApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGFydFNlcnZlcihzZXJ2ZXJTdGFydENvbW1hbmQpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcFRvKFtiLCBzXSksXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxvZ2dlci5lcnJvcihgJHtzZXJ2ZXJFcnJvck1lc3NhZ2V9XFxuJHttYXBFcnJvclRvTWVzc2FnZShlcnIpfWApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICB9KSxcbiAgICAgICAgbWFwKFxuICAgICAgICAgIChbYiwgc10pID0+XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBiLnN1Y2Nlc3MgJiYgcy5zdWNjZXNzLFxuICAgICAgICAgICAgICAgIGVycm9yOiBiLmVycm9yIHx8IHMuZXJyb3IsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNlcnZlclBvcnQsXG4gICAgICAgICAgICBdIGFzIFtTU1JEZXZTZXJ2ZXJCdWlsZGVyT3V0cHV0LCBudW1iZXJdLFxuICAgICAgICApLFxuICAgICAgICB0YXAoKFtidWlsZGVyT3V0cHV0XSkgPT4ge1xuICAgICAgICAgIGlmIChidWlsZGVyT3V0cHV0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGNvbnRleHQubG9nZ2VyLmluZm8oJ1xcbkNvbXBpbGVkIHN1Y2Nlc3NmdWxseS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkZWJvdW5jZSgoW2J1aWxkZXJPdXRwdXRdKSA9PlxuICAgICAgICAgIGJ1aWxkZXJPdXRwdXQuc3VjY2VzcyAmJiAhb3B0aW9ucy5pbnNwZWN0XG4gICAgICAgICAgICA/IHdhaXRVbnRpbFNlcnZlcklzTGlzdGVuaW5nKHNlcnZlclBvcnQpXG4gICAgICAgICAgICA6IEVNUFRZLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB9KSxcbiAgICBjb25jYXRNYXAoKFtidWlsZGVyT3V0cHV0LCBzZXJ2ZXJQb3J0XSkgPT4ge1xuICAgICAgaWYgKCFidWlsZGVyT3V0cHV0LnN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIG9mKGJ1aWxkZXJPdXRwdXQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnNJbnN0YW5jZS5hY3RpdmUpIHtcbiAgICAgICAgYnNJbnN0YW5jZS5yZWxvYWQoKTtcblxuICAgICAgICByZXR1cm4gb2YoYnVpbGRlck91dHB1dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnJvbShpbml0QnJvd3NlclN5bmMoYnNJbnN0YW5jZSwgc2VydmVyUG9ydCwgb3B0aW9ucywgY29udGV4dCkpLnBpcGUoXG4gICAgICAgICAgdGFwKChicykgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmFzZVVybCA9IGdldEJhc2VVcmwoYnMpO1xuICAgICAgICAgICAgY29udGV4dC5sb2dnZXIuaW5mbyh0YWdzLm9uZUxpbmVgXG4gICAgICAgICAgICAgICAgKipcbiAgICAgICAgICAgICAgICBBbmd1bGFyIFVuaXZlcnNhbCBMaXZlIERldmVsb3BtZW50IFNlcnZlciBpcyBsaXN0ZW5pbmcgb24gJHtiYXNlVXJsfSxcbiAgICAgICAgICAgICAgICBvcGVuIHlvdXIgYnJvd3NlciBvbiAke2Jhc2VVcmx9XG4gICAgICAgICAgICAgICAgKipcbiAgICAgICAgICAgICAgYCk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgbWFwVG8oYnVpbGRlck91dHB1dCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSksXG4gICAgbWFwKFxuICAgICAgKGJ1aWxkZXJPdXRwdXQpID0+XG4gICAgICAgICh7XG4gICAgICAgICAgc3VjY2VzczogYnVpbGRlck91dHB1dC5zdWNjZXNzLFxuICAgICAgICAgIGVycm9yOiBidWlsZGVyT3V0cHV0LmVycm9yLFxuICAgICAgICAgIGJhc2VVcmw6IGJzSW5zdGFuY2UgJiYgZ2V0QmFzZVVybChic0luc3RhbmNlKSxcbiAgICAgICAgfSBhcyBTU1JEZXZTZXJ2ZXJCdWlsZGVyT3V0cHV0KSxcbiAgICApLFxuICAgIGZpbmFsaXplKCgpID0+IHtcbiAgICAgIGlmIChic0luc3RhbmNlKSB7XG4gICAgICAgIGJzSW5zdGFuY2UuZXhpdCgpO1xuICAgICAgICBic0luc3RhbmNlLmNsZWFudXAoKTtcbiAgICAgIH1cbiAgICB9KSxcbiAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgIG9mKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBtYXBFcnJvclRvTWVzc2FnZShlcnJvciksXG4gICAgICB9KSxcbiAgICApLFxuICApO1xufVxuXG5mdW5jdGlvbiBzdGFydE5vZGVTZXJ2ZXIoXG4gIHNlcnZlck91dHB1dDogQnVpbGRlck91dHB1dCxcbiAgcG9ydDogbnVtYmVyLFxuICBsb2dnZXI6IGxvZ2dpbmcuTG9nZ2VyQXBpLFxuICBpbnNwZWN0TW9kZSA9IGZhbHNlLFxuKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gIGNvbnN0IG91dHB1dFBhdGggPSBzZXJ2ZXJPdXRwdXQub3V0cHV0UGF0aCBhcyBzdHJpbmc7XG4gIGNvbnN0IHBhdGggPSBqb2luKG91dHB1dFBhdGgsICdtYWluLmpzJyk7XG4gIGNvbnN0IGVudiA9IHsgLi4ucHJvY2Vzcy5lbnYsIFBPUlQ6ICcnICsgcG9ydCB9O1xuXG4gIGNvbnN0IGFyZ3MgPSBbYFwiJHtwYXRofVwiYF07XG4gIGlmIChpbnNwZWN0TW9kZSkge1xuICAgIGFyZ3MudW5zaGlmdCgnLS1pbnNwZWN0LWJyaycpO1xuICB9XG5cbiAgcmV0dXJuIG9mKG51bGwpLnBpcGUoXG4gICAgZGVsYXkoMCksIC8vIEF2b2lkIEVBRERSSU5VU0UgZXJyb3Igc2luY2UgaXQgd2lsbCBjYXVzZSB0aGUga2lsbCBldmVudCB0byBiZSBmaW5pc2guXG4gICAgc3dpdGNoTWFwKCgpID0+IHNwYXduQXNPYnNlcnZhYmxlKCdub2RlJywgYXJncywgeyBlbnYsIHNoZWxsOiB0cnVlIH0pKSxcbiAgICB0YXAoKHsgc3RkZXJyLCBzdGRvdXQgfSkgPT4ge1xuICAgICAgaWYgKHN0ZGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3Ioc3RkZXJyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ZG91dCAmJiAhSUdOT1JFRF9TVERPVVRfTUVTU0FHRVMuc29tZSgoeCkgPT4gc3Rkb3V0LmluY2x1ZGVzKHgpKSkge1xuICAgICAgICBsb2dnZXIuaW5mbyhzdGRvdXQpO1xuICAgICAgfVxuICAgIH0pLFxuICAgIGlnbm9yZUVsZW1lbnRzKCksXG4gICAgLy8gRW1pdCBhIHNpZ25hbCBhZnRlciB0aGUgcHJvY2VzcyBoYXMgYmVlbiBzdGFydGVkXG4gICAgc3RhcnRXaXRoKHVuZGVmaW5lZCksXG4gICk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0U2VydmVyKHNlcnZlclN0YXJ0Q29tbWFuZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gIGNvbnN0IGVudiA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcHJvY2Vzcy5lbnYpKTtcblxuICByZXR1cm4gc3Bhd25Bc09ic2VydmFibGUoc2VydmVyU3RhcnRDb21tYW5kLCBbXSwgeyBlbnYgfSlcbiAgICAucGlwZShzdGFydFdpdGgodW5kZWZpbmVkKSwgbWFwVG8odW5kZWZpbmVkKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRCcm93c2VyU3luYyhcbiAgYnJvd3NlclN5bmNJbnN0YW5jZTogYnJvd3NlclN5bmMuQnJvd3NlclN5bmNJbnN0YW5jZSxcbiAgc2VydmVyUG9ydDogbnVtYmVyLFxuICBvcHRpb25zOiBTU1JEZXZTZXJ2ZXJCdWlsZGVyT3B0aW9ucyxcbiAgY29udGV4dDogQnVpbGRlckNvbnRleHQsXG4pOiBQcm9taXNlPGJyb3dzZXJTeW5jLkJyb3dzZXJTeW5jSW5zdGFuY2U+IHtcbiAgaWYgKGJyb3dzZXJTeW5jSW5zdGFuY2UuYWN0aXZlKSB7XG4gICAgcmV0dXJuIGJyb3dzZXJTeW5jSW5zdGFuY2U7XG4gIH1cblxuICBjb25zdCB7IHBvcnQ6IGJyb3dzZXJTeW5jUG9ydCwgb3BlbiwgaG9zdCwgcHVibGljSG9zdCwgcHJveHlDb25maWcgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGJzUG9ydCA9IGJyb3dzZXJTeW5jUG9ydCB8fCAoYXdhaXQgZ2V0QXZhaWxhYmxlUG9ydCgpKTtcbiAgY29uc3QgYnNPcHRpb25zOiBicm93c2VyU3luYy5PcHRpb25zID0ge1xuICAgIHByb3h5OiB7XG4gICAgICB0YXJnZXQ6IGBsb2NhbGhvc3Q6JHtzZXJ2ZXJQb3J0fWAsXG4gICAgICBwcm94eU9wdGlvbnM6IHtcbiAgICAgICAgeGZ3ZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBwcm94eVJlczogW1xuICAgICAgICAocHJveHlSZXMpID0+IHtcbiAgICAgICAgICBpZiAoJ2hlYWRlcnMnIGluIHByb3h5UmVzKSB7XG4gICAgICAgICAgICBwcm94eVJlcy5oZWFkZXJzWydjYWNoZS1jb250cm9sJ10gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIC8vIHByb3h5T3B0aW9ucyBpcyBub3QgaW4gdGhlIHR5cGluZ3NcbiAgICB9IGFzIGJyb3dzZXJTeW5jLlByb3h5T3B0aW9ucyAmIHsgcHJveHlPcHRpb25zOiB7IHhmd2Q6IGJvb2xlYW4gfSB9LFxuICAgIGhvc3QsXG4gICAgcG9ydDogYnNQb3J0LFxuICAgIHVpOiBmYWxzZSxcbiAgICBzZXJ2ZXI6IGZhbHNlLFxuICAgIG5vdGlmeTogZmFsc2UsXG4gICAgZ2hvc3RNb2RlOiBmYWxzZSxcbiAgICBsb2dMZXZlbDogJ3NpbGVudCcsXG4gICAgb3BlbixcbiAgICBodHRwczogZ2V0U3NsQ29uZmlnKGNvbnRleHQud29ya3NwYWNlUm9vdCwgb3B0aW9ucyksXG4gIH07XG5cbiAgY29uc3QgcHVibGljSG9zdE5vcm1hbGl6ZWQgPVxuICAgIHB1YmxpY0hvc3QgJiYgcHVibGljSG9zdC5lbmRzV2l0aCgnLycpXG4gICAgICA/IHB1YmxpY0hvc3Quc3Vic3RyaW5nKDAsIHB1YmxpY0hvc3QubGVuZ3RoIC0gMSlcbiAgICAgIDogcHVibGljSG9zdDtcblxuICBpZiAocHVibGljSG9zdE5vcm1hbGl6ZWQpIHtcbiAgICBjb25zdCB7IHByb3RvY29sLCBob3N0bmFtZSwgcG9ydCwgcGF0aG5hbWUgfSA9IHVybC5wYXJzZShwdWJsaWNIb3N0Tm9ybWFsaXplZCk7XG4gICAgY29uc3QgZGVmYXVsdFNvY2tldElvUGF0aCA9ICcvYnJvd3Nlci1zeW5jL3NvY2tldC5pbyc7XG4gICAgY29uc3QgZGVmYXVsdE5hbWVzcGFjZSA9ICcvYnJvd3Nlci1zeW5jJztcbiAgICBjb25zdCBoYXNQYXRobmFtZSA9ICEhKHBhdGhuYW1lICYmIHBhdGhuYW1lICE9PSAnLycpO1xuICAgIGNvbnN0IG5hbWVzcGFjZSA9IGhhc1BhdGhuYW1lID8gcGF0aG5hbWUgKyBkZWZhdWx0TmFtZXNwYWNlIDogZGVmYXVsdE5hbWVzcGFjZTtcbiAgICBjb25zdCBwYXRoID0gaGFzUGF0aG5hbWUgPyBwYXRobmFtZSArIGRlZmF1bHRTb2NrZXRJb1BhdGggOiBkZWZhdWx0U29ja2V0SW9QYXRoO1xuXG4gICAgYnNPcHRpb25zLnNvY2tldCA9IHtcbiAgICAgIG5hbWVzcGFjZSxcbiAgICAgIHBhdGgsXG4gICAgICBkb21haW46IHVybC5mb3JtYXQoe1xuICAgICAgICBwcm90b2NvbCxcbiAgICAgICAgaG9zdG5hbWUsXG4gICAgICAgIHBvcnQsXG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgLy8gV2hlbiBoYXZpbmcgYSBwYXRobmFtZSB3ZSBhbHNvIG5lZWQgdG8gY3JlYXRlIGEgcmV2ZXJzZSBwcm94eSBiZWNhdXNlIHNvY2tldC5pb1xuICAgIC8vIHdpbGwgYmUgbGlzdGVuaW5nIG9uOiAnaHR0cDovL2xvY2FsaG9zdDo0MjAwL3Nzci9icm93c2VyLXN5bmMvc29ja2V0LmlvJ1xuICAgIC8vIEhvd2V2ZXIgdXNlcnMgd2lsbCB0eXBpY2FsbHkgaGF2ZSBhIHJldmVyc2UgcHJveHkgdGhhdCB3aWxsIHJlZGlyZWN0IGFsbCBtYXRjaGluZyByZXF1ZXN0c1xuICAgIC8vIGV4OiBodHRwOi8vdGVzdGluZ2hvc3QuY29tL3NzciAtPiBodHRwOi8vbG9jYWxob3N0OjQyMDAgd2hpY2ggd2lsbCByZXN1bHQgaW4gYSA0MDQuXG4gICAgaWYgKGhhc1BhdGhuYW1lKSB7XG4gICAgICAvLyBSZW1vdmUgbGVhZGluZyBzbGFzaFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgIChic09wdGlvbnMuc2NyaXB0UGF0aCA9IChwKSA9PiBwLnN1YnN0cmluZygxKSksXG4gICAgICAgIChic09wdGlvbnMubWlkZGxld2FyZSA9IFtcbiAgICAgICAgICBjcmVhdGVQcm94eU1pZGRsZXdhcmUoZGVmYXVsdFNvY2tldElvUGF0aCwge1xuICAgICAgICAgICAgdGFyZ2V0OiB1cmwuZm9ybWF0KHtcbiAgICAgICAgICAgICAgcHJvdG9jb2w6ICdodHRwJyxcbiAgICAgICAgICAgICAgaG9zdG5hbWU6IGhvc3QsXG4gICAgICAgICAgICAgIHBvcnQ6IGJzUG9ydCxcbiAgICAgICAgICAgICAgcGF0aG5hbWU6IHBhdGgsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgICAgbG9nTGV2ZWw6ICdzaWxlbnQnLFxuICAgICAgICAgIH0pIGFzIGFueSxcbiAgICAgICAgXSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHByb3h5Q29uZmlnKSB7XG4gICAgaWYgKCFic09wdGlvbnMubWlkZGxld2FyZSkge1xuICAgICAgYnNPcHRpb25zLm1pZGRsZXdhcmUgPSBbXTtcbiAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGJzT3B0aW9ucy5taWRkbGV3YXJlKSkge1xuICAgICAgYnNPcHRpb25zLm1pZGRsZXdhcmUgPSBbYnNPcHRpb25zLm1pZGRsZXdhcmVdO1xuICAgIH1cblxuICAgIGJzT3B0aW9ucy5taWRkbGV3YXJlID0gW1xuICAgICAgLi4uYnNPcHRpb25zLm1pZGRsZXdhcmUsXG4gICAgICAuLi5nZXRQcm94eUNvbmZpZyhjb250ZXh0LndvcmtzcGFjZVJvb3QsIHByb3h5Q29uZmlnKSxcbiAgICBdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBicm93c2VyU3luY0luc3RhbmNlLmluaXQoYnNPcHRpb25zLCAoZXJyb3IsIGJzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoYnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbWFwRXJyb3JUb01lc3NhZ2UoZXJyb3I6IHVua25vd24pOiBzdHJpbmcge1xuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIHJldHVybiBlcnJvci5tZXNzYWdlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIGdldFNzbENvbmZpZyhcbiAgcm9vdDogc3RyaW5nLFxuICBvcHRpb25zOiBTU1JEZXZTZXJ2ZXJCdWlsZGVyT3B0aW9ucyxcbik6IGJyb3dzZXJTeW5jLkh0dHBzT3B0aW9ucyB8IHVuZGVmaW5lZCB8IGJvb2xlYW4ge1xuICBjb25zdCB7IHNzbCwgc3NsQ2VydCwgc3NsS2V5IH0gPSBvcHRpb25zO1xuICBpZiAoc3NsICYmIHNzbENlcnQgJiYgc3NsS2V5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogcGF0aFJlc29sdmUocm9vdCwgc3NsS2V5KSxcbiAgICAgIGNlcnQ6IHBhdGhSZXNvbHZlKHJvb3QsIHNzbENlcnQpLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3NsO1xufVxuXG5mdW5jdGlvbiBnZXRQcm94eUNvbmZpZyhyb290OiBzdHJpbmcsIHByb3h5Q29uZmlnOiBzdHJpbmcpOiBicm93c2VyU3luYy5NaWRkbGV3YXJlSGFuZGxlcltdIHtcbiAgY29uc3QgcHJveHlQYXRoID0gcGF0aFJlc29sdmUocm9vdCwgcHJveHlDb25maWcpO1xuICBsZXQgcHJveHlTZXR0aW5nczogYW55O1xuICB0cnkge1xuICAgIHByb3h5U2V0dGluZ3MgPSByZXF1aXJlKHByb3h5UGF0aCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdNT0RVTEVfTk9UX0ZPVU5EJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm94eSBjb25maWcgZmlsZSAke3Byb3h5UGF0aH0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cblxuICBjb25zdCBwcm94aWVzID0gQXJyYXkuaXNBcnJheShwcm94eVNldHRpbmdzKSA/IHByb3h5U2V0dGluZ3MgOiBbcHJveHlTZXR0aW5nc107XG5cbiAgcmV0dXJuIHByb3hpZXMubWFwKChwcm94eSkgPT4ge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwcm94eSk7XG4gICAgY29uc3QgY29udGV4dCA9IGtleXNbMF07XG5cbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDEgfHwgdHlwZW9mIGNvbnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBub3JtYWxpemVkQ29udGV4dCA9IGNvbnRleHQucmVwbGFjZSgvXlxcKiQvLCAnKionKS5yZXBsYWNlKC9cXC9cXCokLywgJycpO1xuXG4gICAgICByZXR1cm4gY3JlYXRlUHJveHlNaWRkbGV3YXJlKG5vcm1hbGl6ZWRDb250ZXh0LCBwcm94eVtjb250ZXh0XSkgYXMgYW55O1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVQcm94eU1pZGRsZXdhcmUocHJveHkpIGFzIGFueTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJ1aWxkZXI8U1NSRGV2U2VydmVyQnVpbGRlck9wdGlvbnMsIEJ1aWxkZXJPdXRwdXQ+KGV4ZWN1dGUpO1xuIl19
