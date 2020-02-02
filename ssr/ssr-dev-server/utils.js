"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
exports.__esModule = true;
var child_process_1 = require("child_process");
var net_1 = require("net");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var treeKill = require("tree-kill");
function getAvailablePort() {
    return new Promise(function (resolve, reject) {
        var server = net_1.createServer();
        server
            .unref()
            .on('error', reject)
            .listen(0, function () {
            var port = server.address().port;
            server.close(function () { return resolve(port); });
        });
    });
}
exports.getAvailablePort = getAvailablePort;
function spawnAsObservable(command, args, options) {
    if (args === void 0) { args = []; }
    if (options === void 0) { options = {}; }
    return new rxjs_1.Observable(function (obs) {
        var proc = child_process_1.spawn(command, args, options);
        if (proc.stdout) {
            proc.stdout.on('data', function (data) { return obs.next({ stdout: data.toString() }); });
        }
        if (proc.stderr) {
            proc.stderr.on('data', function (data) { return obs.next({ stderr: data.toString() }); });
        }
        proc
            .on('error', function (err) { return obs.error(err); })
            .on('close', function (code) {
            if (code !== 0) {
                obs.error(new Error(command + " exited with " + code + " code."));
            }
            obs.complete();
        });
        return function () {
            if (!proc.killed) {
                treeKill(proc.pid, 'SIGTERM');
            }
        };
    });
}
exports.spawnAsObservable = spawnAsObservable;
function waitUntilServerIsListening(port, host) {
    var allowedErrorCodes = [
        'ECONNREFUSED',
        'ECONNRESET',
    ];
    return new rxjs_1.Observable(function (obs) {
        var client = net_1.createConnection({ host: host, port: port }, function () {
            obs.next(undefined);
            obs.complete();
        })
            .on('error', function (err) { return obs.error(err); });
        return function () {
            if (!client.destroyed) {
                client.destroy();
            }
        };
    })
        .pipe(operators_1.retryWhen(function (err) { return err.pipe(operators_1.mergeMap(function (error, attempts) {
        return attempts > 10 || !allowedErrorCodes.includes(error.code)
            ? rxjs_1.throwError(error)
            : rxjs_1.timer(100 * (attempts * 1));
    })); }));
}
exports.waitUntilServerIsListening = waitUntilServerIsListening;
