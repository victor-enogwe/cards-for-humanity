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
        return utils_1.execAsObservable(serverStartCommand, {})
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2J1aWxkZXJzL3NyYy9zc3ItZGV2LXNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVILHlEQUttQztJQUNuQywrQ0FBMkQ7SUFDM0QsK0JBT2M7SUFFZCw4Q0FRd0I7SUFDeEIsMEVBQTZEO0lBQzdELDRDQUE0QztJQUM1QywrQkFBNEI7SUFJNUIsU0FBZ0IsT0FBTyxDQUNyQixPQUFtQyxFQUNuQyxPQUF1QjtRQUV2QixNQUFNLGFBQWEsR0FBRyxrQ0FBc0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEUsTUFBTSxZQUFZLEdBQUcsa0NBQXNCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWxFLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDN0QsVUFBVSxFQUFFLElBQUk7WUFDaEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7U0FDM0IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7WUFDM0QsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7U0FDM0IsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQTs7Ozs7OztFQU90QyxDQUFDLENBQUM7UUFFRixJQUFJLFVBQXVELENBQUM7UUFDNUQsT0FBTyxVQUFHLENBQ1IsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZix3QkFBZ0IsRUFBRSxDQUNuQixDQUFDLElBQUksQ0FDSixxQkFBUyxDQUFDLENBQUMs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O0lBRUQsU0FBZSxnQkFBZ0IsQ0FDN0IsY0FBc0IsRUFDdEIsT0FBbUMsRUFDbkMsTUFBeUI7O1lBRXpCLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksS0FBSSxNQUFNLHdCQUFnQixFQUFFLENBQUEsQ0FBQztZQUVoRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNoQyxLQUFLLEVBQUUsYUFBYSxjQUFjLEVBQUU7Z0JBQ3BDLElBQUksRUFBRSxNQUFNO2dCQUNaLEVBQUUsRUFBRSxLQUFLO2dCQUNULE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsSUFBSTthQUNMLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBSSxDQUFDLE9BQU8sQ0FBQTs7aUZBRXVELE1BQU07NENBQzNDLE1BQU07O0dBRS9DLENBQUMsQ0FBQztZQUVILE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVELFNBQVMsaUJBQWlCLENBQUMsS0FBYztRQUN2QyxJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7WUFDMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELGtCQUFlLHlCQUFhLENBQTRDLE9BQU8sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEJ1aWxkZXJPdXRwdXQsXG4gIGNyZWF0ZUJ1aWxkZXIsXG4gIEJ1aWxkZXJDb250ZXh0LFxuICB0YXJnZXRGcm9tVGFyZ2V0U3RyaW5nLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvYXJjaGl0ZWN0JztcbmltcG9ydCB7IGpzb24sIHRhZ3MsIGxvZ2dpbmcgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQge1xuICBPYnNlcnZhYmxlLFxuICBmcm9tLFxuICBvZixcbiAgTkVWRVIsXG4gIGNvbWJpbmVMYXRlc3QsXG4gIHppcCxcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQge1xuICBkZWJvdW5jZVRpbWUsXG4gIHN3aXRjaE1hcCxcbiAgbWFwLFxuICB0YXAsXG4gIGNhdGNoRXJyb3IsXG4gIHN0YXJ0V2l0aCxcbiAgbWFwVG8sXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGdldEF2YWlsYWJsZVBvcnQsIGV4ZWNBc09ic2VydmFibGUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGJyb3dzZXJTeW5jIGZyb20gJ2Jyb3dzZXItc3luYyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5cbmV4cG9ydCB0eXBlIFNTUkRldlNlcnZlckJ1aWxkZXJPcHRpb25zID0gU2NoZW1hICYganNvbi5Kc29uT2JqZWN0O1xuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZShcbiAgb3B0aW9uczogU1NSRGV2U2VydmVyQnVpbGRlck9wdGlvbnMsXG4gIGNvbnRleHQ6IEJ1aWxkZXJDb250ZXh0LFxuKTogT2JzZXJ2YWJsZTxCdWlsZGVyT3V0cHV0PiB7XG4gIGNvbnN0IGJyb3dzZXJUYXJnZXQgPSB0YXJnZXRGcm9tVGFyZ2V0U3RyaW5nKG9wdGlvbnMuYnJvd3NlclRhcmdldCk7XG4gIGNvbnN0IHNlcnZlclRhcmdldCA9IHRhcmdldEZyb21UYXJnZXRTdHJpbmcob3B0aW9ucy5zZXJ2ZXJUYXJnZXQpO1xuXG4gIGNvbnN0IGJyb3dzZXJUYXJnZXRSdW4gPSBjb250ZXh0LnNjaGVkdWxlVGFyZ2V0KGJyb3dzZXJUYXJnZXQsIHtcbiAgICBleHRyYWN0Q3NzOiB0cnVlLFxuICAgIHNlcnZpY2VXb3JrZXI6IGZhbHNlLFxuICAgIHdhdGNoOiB0cnVlLFxuICAgIHByb2dyZXNzOiBvcHRpb25zLnByb2dyZXNzLFxuICB9KTtcblxuICBjb25zdCBzZXJ2ZXJUYXJnZXRSdW4gPSBjb250ZXh0LnNjaGVkdWxlVGFyZ2V0KHNlcnZlclRhcmdldCwge1xuICAgIHdhdGNoOiB0cnVlLFxuICAgIHByb2dyZXNzOiBvcHRpb25zLnByb2dyZXNzLFxuICB9KTtcblxuICBjb250ZXh0LmxvZ2dlci5lcnJvcih0YWdzLnN0cmlwSW5kZW50c2BcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICBUaGlzIGlzIGEgc2ltcGxlIHNlcnZlciBmb3IgdXNlIGluIHRlc3Rpbmcgb3IgZGVidWdnaW5nIEFuZ3VsYXIgYXBwbGljYXRpb25zIGxvY2FsbHkuXG4gIEl0IGhhc24ndCBiZWVuIHJldmlld2VkIGZvciBzZWN1cml0eSBpc3N1ZXMuXG5cbiAgRE9OJ1QgVVNFIElUIEZPUiBQUk9EVUNUSU9OIVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gYCk7XG5cbiAgbGV0IGJzSW5zdGFuY2U6IGJyb3dzZXJTeW5jLkJyb3dzZXJTeW5jSW5zdGFuY2UgfCB1bmRlZmluZWQ7XG4gIHJldHVybiB6aXAoXG4gICAgYnJvd3NlclRhcmdldFJ1bixcbiAgICBzZXJ2ZXJUYXJnZXRSdW4sXG4gICAgZ2V0QXZhaWxhYmxlUG9ydCgpLFxuICApLnBpcGUoXG4gICAgc3dpdGNoTWFwKChbYnIsIHNyLCBub2RlU2VydmVyUG9ydF0pID0+IHtcbiAgICAgIGNvbnN0IHNlcnZlciQgPSBzci5vdXRwdXQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKHMgPT4ge1xuICAgICAgICAgIGlmICghcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gb2Yocyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdGFydE5vZGVTZXJ2ZXIocywgbm9kZVNlcnZlclBvcnQpLnBpcGUoXG4gICAgICAgICAgICBtYXBUbyhzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgICAgY29udGV4dC5sb2dnZXIuZXJyb3IoYEEgc2VydmVyIGVycm9yIGhhcyBvY2N1cnJlZC5cXG4ke21hcEVycm9yVG9NZXNzYWdlKGVycil9YCk7XG4gICAgICAgICAgICAgIHJldHVybiBORVZFUjtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pKTtcblxuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoYnIub3V0cHV0LCBzZXJ2ZXIkLCBvZihub2RlU2VydmVyUG9ydCkpLnBpcGUoXG4gICAgICAgIC8vIFRoaXMgaXMgbmVlZGVkIHNvIHRoYXQgaWYgYm90aCBzZXJ2ZXIgYW5kIGJyb3dzZXIgZW1pdCBjbG9zZSB0byBlYWNoIG90aGVyXG4gICAgICAgIC8vIHdlIG9ubHkgZW1pdCBvbmNlLiBUaGlzIHR5cGljYWxseSBoYXBwZW5zIG9uIHRoZSBmaXJzdCBidWlsZC5cbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMCksXG4gICAgICApO1xuICAgIH0pLFxuICAgIG1hcCgoW2IsIHMsIG5vZGVTZXJ2ZXJQb3J0XSkgPT4gKFtcbiAgICAgIHtcbiAgICAgICAgc3VjY2VzczogYi5zdWNjZXNzICYmIHMuc3VjY2VzcyxcbiAgICAgICAgZXJyb3I6IGIuZXJyb3IgfHwgcy5lcnJvcixcbiAgICAgIH0sXG4gICAgICBub2RlU2VydmVyUG9ydCxcbiAgICBdIGFzIFtCdWlsZGVyT3V0cHV0LCBudW1iZXJdKSksXG4gICAgc3dpdGNoTWFwKChbYnVpbGRlck91dHB1dCwgbm9kZVNlcnZlclBvcnRdKSA9PiB7XG4gICAgICBpZiAoIWJ1aWxkZXJPdXRwdXQuc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gb2YoYnVpbGRlck91dHB1dCk7XG4gICAgICB9XG4gICAgICBpZiAoIWJzSW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGZyb20oc3RhcnRCcm93c2VyU3luYyhub2RlU2VydmVyUG9ydCwgb3B0aW9ucywgY29udGV4dC5sb2dnZXIpKS5waXBlKFxuICAgICAgICAgIHRhcChpbnN0YW5jZSA9PiBic0luc3RhbmNlID0gaW5zdGFuY2UpLFxuICAgICAgICAgIG1hcFRvKGJ1aWxkZXJPdXRwdXQpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBic0luc3RhbmNlLnJlbG9hZCgpO1xuICAgICAgICByZXR1cm4gb2YoYnVpbGRlck91dHB1dCk7XG4gICAgICB9XG4gICAgfSksXG4gICAgY2F0Y2hFcnJvcihlcnJvciA9PiBvZih7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiBtYXBFcnJvclRvTWVzc2FnZShlcnJvciksXG4gICAgfSkpXG4gICk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0Tm9kZVNlcnZlcihzZXJ2ZXJPdXRwdXQ6IEJ1aWxkZXJPdXRwdXQsIHBvcnQ6IG51bWJlcik6IE9ic2VydmFibGU8dm9pZD4ge1xuICBjb25zdCBvdXRwdXRQYXRoID0gc2VydmVyT3V0cHV0Lm91dHB1dFBhdGggYXMgc3RyaW5nO1xuICBjb25zdCBwYXRoID0gam9pbihvdXRwdXRQYXRoLCAnbWFpbi5qcycpO1xuICBjb25zdCBlbnYgPSB7IC4uLnByb2Nlc3MuZW52LCBQT1JUOiAnJyArIHBvcnQgfTtcblxuICByZXR1cm4gZXhlY0FzT2JzZXJ2YWJsZShgbm9kZSAke3BhdGh9YCwgeyBlbnYgfSlcbiAgICAucGlwZShcbiAgICAgIC8vIEVtaXQgYSBzaWduYWwgYWZ0ZXIgdGhlIHByb2Nlc3MgaGFzIGJlZW4gc3RhcnRlZFxuICAgICAgc3RhcnRXaXRoKHVuZGVmaW5lZCksXG4gICAgICBtYXBUbyh1bmRlZmluZWQpLFxuICAgICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0QnJvd3NlclN5bmMoXG4gIG5vZGVTZXJ2ZXJQb3J0OiBudW1iZXIsXG4gIG9wdGlvbnM6IFNTUkRldlNlcnZlckJ1aWxkZXJPcHRpb25zLFxuICBsb2dnZXI6IGxvZ2dpbmcuTG9nZ2VyQXBpLFxuKTogUHJvbWlzZTxicm93c2VyU3luYy5Ccm93c2VyU3luY0luc3RhbmNlPiB7XG4gIGNvbnN0IHsgcG9ydCwgb3BlbiB9ID0gb3B0aW9ucztcbiAgY29uc3QgYnNQb3J0ID0gcG9ydCB8fCBhd2FpdCBnZXRBdmFpbGFibGVQb3J0KCk7XG5cbiAgY29uc3QgaW5zdGFuY2UgPSBicm93c2VyU3luYy5pbml0KHtcbiAgICBwcm94eTogYGxvY2FsaG9zdDoke25vZGVTZXJ2ZXJQb3J0fWAsXG4gICAgcG9ydDogYnNQb3J0LFxuICAgIHVpOiBmYWxzZSxcbiAgICBzZXJ2ZXI6IGZhbHNlLFxuICAgIG5vdGlmeTogZmFsc2UsXG4gICAgZ2hvc3RNb2RlOiBmYWxzZSxcbiAgICBsb2dMZXZlbDogJ3NpbGVudCcsXG4gICAgb3BlbixcbiAgfSk7XG5cbiAgbG9nZ2VyLmluZm8odGFncy5vbmVMaW5lYFxuICAgICoqXG4gICAgQW5ndWxhciBVbml2ZXJzYWwgTGl2ZSBEZXZlbG9wbWVudCBTZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6JHtic1BvcnR9LFxuICAgIG9wZW4geW91ciBicm93c2VyIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6JHtic1BvcnR9XG4gICAgKipcbiAgYCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5mdW5jdGlvbiBtYXBFcnJvclRvTWVzc2FnZShlcnJvcjogdW5rbm93bik6IHN0cmluZyB7XG4gIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgcmV0dXJuIGVycm9yLm1lc3NhZ2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQnVpbGRlcjxTU1JEZXZTZXJ2ZXJCdWlsZGVyT3B0aW9ucywgQnVpbGRlck91dHB1dD4oZXhlY3V0ZSk7XG4iXX0=