"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function (resolve, reject) {
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = {
            label: 0,
            sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        },
        f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;

    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1], done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];
            y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
exports.__esModule = true;
var architect_1 = require("@angular-devkit/architect");
var core_1 = require("@angular-devkit/core");
var browserSync = require("browser-sync");
var proxy = require("http-proxy-middleware");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var url = require("url");
var utils_1 = require("./utils");
/** Log messages to ignore and not rely to the logger */
var IGNORED_STDOUT_MESSAGES = [
    'server listening on',
    'Angular is running in the development mode. Call enableProdMode() to enable the production mode.'
];

function execute(options, context) {
    var browserTarget = architect_1.targetFromTargetString(options.browserTarget);
    var serverTarget = architect_1.targetFromTargetString(options.serverTarget);
    var getBaseUrl = function (bs) {
        return bs.getOption('scheme') + "://" + bs.getOption('host') + ":" + bs.getOption('port');
    };
    var browserTargetRun = context.scheduleTarget(browserTarget, {
        extractCss: true,
        serviceWorker: false,
        watch: true,
        progress: options.progress
    });
    var serverTargetRun = context.scheduleTarget(serverTarget, {
        watch: true,
        progress: options.progress
    });
    var bsInstance = browserSync.create();
    context.logger.error(core_1.tags.stripIndents(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ****************************************************************************************\n  This is a simple server for use in testing or debugging Angular applications locally.\n  It hasn't been reviewed for security issues.\n\n  DON'T USE IT FOR PRODUCTION!\n  ****************************************************************************************\n "], ["\n  ****************************************************************************************\n  This is a simple server for use in testing or debugging Angular applications locally.\n  It hasn't been reviewed for security issues.\n\n  DON'T USE IT FOR PRODUCTION!\n  ****************************************************************************************\n "]))));
    return rxjs_1.zip(browserTargetRun, serverTargetRun, rxjs_1.of(options)).pipe(operators_1.switchMap(function (_a) {
        var br = _a[0],
            sr = _a[1],
            options = _a[2];
        var serverUrl = options.serverUrl,
            serverStartCommand = options.serverStartCommand;
        var serverPort = serverUrl ? Number(url.parse(serverUrl).port) : 80;
        var server$ = sr.output.pipe(operators_1.switchMap(function (s) {
            return s.success && serverStartCommand ? startServer(serverStartCommand, context.logger).pipe(operators_1.mapTo(s), operators_1.catchError(function (err) {
                context.logger.error("A server error has occurred.\n" + mapErrorToMessage(err));
                return rxjs_1.EMPTY;
            })) : rxjs_1.of(s);
        }));
        return rxjs_1.combineLatest([br.output, server$]).pipe(
            // This is needed so that if both server and browser emit close to each other
            // we only emit once. This typically happens on the first build.
            operators_1.debounceTime(120), operators_1.map(function (_a) {
                var b = _a[0],
                    s = _a[1];
                return [{
                        success: b.success && s.success,
                        error: b.error || s.error
                    },
                    serverPort,
                ];
            }), operators_1.tap(function (_a) {
                var builderOutput = _a[0];
                if (builderOutput.success) {
                    context.logger.info('\nCompiled successfully.');
                }
            }), operators_1.debounce(function (_a) {
                var builderOutput = _a[0];
                return builderOutput.success && serverPort ?
                    utils_1.waitUntilServerIsListening(serverPort) :
                    rxjs_1.EMPTY;
            }));
    }), operators_1.concatMap(function (_a) {
        var builderOutput = _a[0];
        if (!builderOutput.success) {
            return rxjs_1.of(builderOutput);
        }
        if (bsInstance.active) {
            bsInstance.reload();
            return rxjs_1.of(builderOutput);
        } else {
            return rxjs_1.from(initBrowserSync(bsInstance, options))
                .pipe(operators_1.tap(function (bs) {
                    var baseUrl = getBaseUrl(bs);
                    context.logger.info(core_1.tags.oneLine(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                **\n                Angular Universal Live Development Server is listening on ", ",\n                open your browser on ", "\n                **\n              "], ["\n                **\n                Angular Universal Live Development Server is listening on ", ",\n                open your browser on ", "\n                **\n              "])), baseUrl, baseUrl));
                }), operators_1.mapTo(builderOutput));
        }
    }), operators_1.map(function (builderOutput) {
        return ({
            success: builderOutput.success,
            error: builderOutput.error,
            baseUrl: bsInstance && getBaseUrl(bsInstance)
        });
    }), operators_1.finalize(function () {
        if (bsInstance) {
            bsInstance.exit();
            bsInstance.cleanup();
        }
    }), operators_1.catchError(function (error) {
        return rxjs_1.of({
            success: false,
            error: mapErrorToMessage(error)
        });
    }));
}
exports.execute = execute;

function startServer(serverStartCommand, logger) {
    return rxjs_1.of(null)
        .pipe(operators_1.delay(0), // Avoid EADDRINUSE error since it will cause the kill event to be finished.
            operators_1.switchMap(function () {
                return utils_1.spawnAsObservable(serverStartCommand, [], {
                    shell: true
                });
            }), operators_1.tap(function (_a) {
                var stderr = _a.stderr,
                    stdout = _a.stdout;
                if (stderr) {
                    logger.error(stderr);
                }
                if (stdout && !IGNORED_STDOUT_MESSAGES.some(function (x) {
                        return stdout.includes(x);
                    })) {
                    logger.info(stdout);
                }
            }), operators_1.ignoreElements(),
            // Emit a signal after the process has been started
            operators_1.startWith(undefined));
}

function initBrowserSync(browserSyncInstance, options) {
    return __awaiter(this, void 0, void 0, function () {
        var browserSyncPort, open, host, publicHost, bsPort, _a, bsOptions, publicHostNormalized, _b, protocol, hostname, port, pathname, defaultSocketIoPath, defaultNamespace, hasPathname, namespace, path;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (browserSyncInstance.active) {
                        return [2 /*return*/ , browserSyncInstance];
                    }
                    browserSyncPort = options.port, open = options.open, host = options.host, publicHost = options.publicHost;
                    _a = browserSyncPort;
                    if (_a) return [3 /*break*/ , 2];
                    return [4 /*yield*/ , utils_1.getAvailablePort()];
                case 1:
                    _a = (_c.sent());
                    _c.label = 2;
                case 2:
                    bsPort = _a;
                    bsOptions = {
                        proxy: {
                            target: options.serverUrl,
                            proxyOptions: {
                                xfwd: true
                            },
                            proxyRes: [
                                function (proxyRes) {
                                    if ('headers' in proxyRes) {
                                        proxyRes.headers['cache-control'] = undefined;
                                    }
                                },
                            ]
                            // proxyOptions is not in the typings
                        },
                        host: host,
                        port: bsPort,
                        ui: false,
                        server: false,
                        notify: false,
                        ghostMode: false,
                        logLevel: 'silent',
                        open: open,
                        // Remove leading slash
                        scriptPath: function (path) {
                            return path.substring(1);
                        }
                    };
                    publicHostNormalized = publicHost && publicHost.endsWith('/') ?
                        publicHost.substring(0, publicHost.length - 1) :
                        publicHost;
                    if (publicHostNormalized) {
                        _b = url.parse(publicHostNormalized), protocol = _b.protocol, hostname = _b.hostname, port = _b.port, pathname = _b.pathname;
                        defaultSocketIoPath = '/browser-sync/socket.io';
                        defaultNamespace = '/browser-sync';
                        hasPathname = !!(pathname && pathname !== '/');
                        namespace = hasPathname ? pathname + defaultNamespace : defaultNamespace;
                        path = hasPathname ? pathname + defaultSocketIoPath : defaultSocketIoPath;
                        bsOptions.socket = {
                            namespace: namespace,
                            path: path,
                            domain: url.format({
                                protocol: protocol,
                                hostname: hostname,
                                port: port
                            })
                        };
                        // When having a pathname we also need to create a reverse proxy because socket.io
                        // will be listening on: 'http://localhost:4200/ssr/browser-sync/socket.io'
                        // However users will typically have a reverse proxy that will redirect all matching requests
                        // ex: http://testinghost.com/ssr -> http://localhost:4200 which will result in a 404.
                        if (hasPathname) {
                            bsOptions.middleware = [
                                proxy(defaultSocketIoPath, {
                                    target: url.format({
                                        protocol: 'http',
                                        hostname: host,
                                        port: bsPort,
                                        pathname: path
                                    }),
                                    ws: true,
                                    logLevel: 'silent'
                                }),
                            ];
                        }
                    }
                    return [2 /*return*/ , new Promise(function (resolve, reject) {
                        browserSyncInstance.init(bsOptions, function (error, bs) {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(bs);
                            }
                        });
                    })];
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
exports["default"] = architect_1.createBuilder(execute);
var templateObject_1, templateObject_2;
