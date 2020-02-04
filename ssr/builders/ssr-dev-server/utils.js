/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@nguniversal/builders/src/ssr-dev-server/utils", ["require", "exports", "child_process", "rxjs", "tree-kill", "net"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const child_process_1 = require("child_process");
    const rxjs_1 = require("rxjs");
    const treeKill = require("tree-kill");
    const net_1 = require("net");
    function getAvailablePort() {
        return new Promise((resolve, reject) => {
            const server = net_1.createServer();
            server
                .unref()
                .on('error', reject)
                .listen(0, () => {
                    const { port } = server.address();
                    server.close(() => resolve(port));
                });
        });
    }
    exports.getAvailablePort = getAvailablePort;
    function execAsObservable(command, options) {
        return new rxjs_1.Observable(obs => {
            const proc = child_process_1.exec(command, options, (err, stdout, stderr) => {
                if (err) {
                    obs.error(err);
                    return;
                }
                obs.next({ stdout, stderr });
                obs.complete();
            });
            return () => {
                if (!proc.killed) {
                    treeKill(proc.pid, 'SIGTERM');
                }
            };
        });
    }
    exports.execAsObservable = execAsObservable;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2J1aWxkZXJzL3NyYy9zc3ItZGV2LXNlcnZlci91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILGlEQUFrRDtJQUNsRCwrQkFBa0M7SUFDbEMsc0NBQXNDO0lBQ3RDLDZCQUFnRDtJQUVoRCxTQUFnQixnQkFBZ0I7UUFDOUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxNQUFNLE1BQU0sR0FBRyxrQkFBWSxFQUFFLENBQUM7WUFDOUIsTUFBTTtpQkFDSCxLQUFLLEVBQUU7aUJBQ1AsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7aUJBQ25CLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFO2dCQUNkLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFpQixDQUFDO2dCQUNqRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBWEQsNENBV0M7SUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxPQUFlLEVBQUUsT0FBb0I7UUFFcEUsT0FBTyxJQUFJLGlCQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEdBQUcsb0JBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDZixPQUFPO2lCQUNSO2dCQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDN0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUMvQjtZQUNILENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQW5CRCw0Q0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgZXhlYywgRXhlY09wdGlvbnMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIHRyZWVLaWxsIGZyb20gJ3RyZWUta2lsbCc7XG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXIsIEFkZHJlc3NJbmZvIH0gZnJvbSAnbmV0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF2YWlsYWJsZVBvcnQoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBzZXJ2ZXIgPSBjcmVhdGVTZXJ2ZXIoKTtcbiAgICBzZXJ2ZXJcbiAgICAgIC51bnJlZigpXG4gICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgLmxpc3RlbigwLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcG9ydCB9ID0gc2VydmVyLmFkZHJlc3MoKSBhcyBBZGRyZXNzSW5mbztcbiAgICAgICAgc2VydmVyLmNsb3NlKCgpID0+IHJlc29sdmUocG9ydCkpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY0FzT2JzZXJ2YWJsZShjb21tYW5kOiBzdHJpbmcsIG9wdGlvbnM6IEV4ZWNPcHRpb25zKTpcbiAgT2JzZXJ2YWJsZTx7IHN0ZG91dDogc3RyaW5nLCBzdGRlcnI6IHN0cmluZyB9PiB7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnMgPT4ge1xuICAgIGNvbnN0IHByb2MgPSBleGVjKGNvbW1hbmQsIG9wdGlvbnMsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIG9icy5lcnJvcihlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG9icy5uZXh0KHsgc3Rkb3V0LCBzdGRlcnIgfSk7XG4gICAgICBvYnMuY29tcGxldGUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoIXByb2Mua2lsbGVkKSB7XG4gICAgICAgIHRyZWVLaWxsKHByb2MucGlkLCAnU0lHVEVSTScpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuIl19