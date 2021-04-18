/*!
 * check-package-usage v0.0.0
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

import * as fs from 'fs';
import fs__default from 'fs';
import path from 'path';
import readline from 'readline';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var ENCODING$1 = 'utf-8';
/**
 * Get a list of dirents from the received path.
 * @param {string} path
 * @returns {Promise<import('fs').Dirent[]>}
 */
function getDirents(path) {
    var options = {
        encoding: ENCODING$1,
        withFileTypes: true,
    };
    return new Promise(function (resolve, reject) {
        // TODO: Add option to verbosely display read directories.
        fs.readdir(path, options, function (error, dirents) {
            if (error) {
                // TODO: Display errors as warnings.
                reject(error);
                return;
            }
            resolve(dirents);
        });
    });
}

/**
 * Resolve path with received segments.
 * @param {...string} segments
 * @returns {string}
 */
function resolvePath() {
    var segments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        segments[_i] = arguments[_i];
    }
    return path.resolve.apply(path, __spreadArray([process.cwd()], segments));
}

/**
 * Get a list of packages from package.json's dependencies and devDependencies.
 * @returns {string[]}
 */
function getPackages() {
    return __awaiter(this, void 0, void 0, function () {
        var path, _a, _b, dependencies, _c, devDependencies;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    path = resolvePath('package.json');
                    return [4 /*yield*/, import(path)];
                case 1:
                    _a = _e.sent(), _b = _a.dependencies, dependencies = _b === void 0 ? {} : _b, _c = _a.devDependencies, devDependencies = _c === void 0 ? {} : _c;
                    return [2 /*return*/, __spreadArray(__spreadArray([], Object.keys(dependencies)), Object.keys(devDependencies))];
                case 2:
                    _e.sent();
                    // TODO: Use original error as reason.
                    process.stdout.write("Error: Couldn't import 'package.json'.");
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}

/**
 * Check if package was used in import declaration as module specifier.
 * @see {@link https://tc39.es/ecma262/#prod-ImportDeclaration} for more details.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsedInImportDeclaration(packageName, line) {
    var matcher = new RegExp("import\\s+['\"]" + packageName + "['\"/]");
    return matcher.test(line);
}
/**
 * Check if package was used in from clause as module specifier.
 * @see {@link https://tc39.es/ecma262/#prod-FromClause} for more details.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsedInFromClause(packageName, line) {
    var matcher = new RegExp("from\\s+['\"]" + packageName + "['\"/]");
    return matcher.test(line);
}
/**
 * Check if package was used in require function as id (module name).
 * @see {@link https://nodejs.org/dist/latest-v15.x/docs/api/modules.html#modules_require_id} for more details.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsedInRequireFunction(packageName, line) {
    var matcher = new RegExp("require\\([`'\"]" + packageName + "[`'\"/]");
    return matcher.test(line);
}
/**
 * Check if package was used in import call as assignment expression.
 * @see {@link https://tc39.es/ecma262/#sec-import-calls} for more details.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsedInImportCall(packageName, line) {
    var matcher = new RegExp("import\\([`'\"]" + packageName + "[`'\"/]");
    return matcher.test(line);
}
/**
 * Check if package was used.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsed(packageName, line) {
    var checkers = [
        packageWasUsedInFromClause,
        packageWasUsedInImportDeclaration,
        packageWasUsedInRequireFunction,
        packageWasUsedInImportCall,
    ];
    return checkers.some(function (check) { return check(packageName, line); });
}

/**
 * Reads the file line-by-line and calls 'onLine' callback for each one of them.
 * @param {string} path
 * @param {(line: string) => void} onLine
 * @returns {Promise<void>}
 */
function readFileLineByLine(path, onLine) {
    return new Promise(function (resolve, reject) {
        var file = readline.createInterface({
            input: fs__default.createReadStream(resolvePath(path), {
                flags: 'r',
                encoding: ENCODING,
            }),
            terminal: false,
        });
        file.on('line', onLine);
        file.on('close', function () {
            resolve();
        });
        file.on('SIGINT', function () {
            reject(new Error('SIGINT'));
        });
    });
}

var ENCODING = 'utf-8';
function setup() {
    return __awaiter(this, void 0, void 0, function () {
        function checkPackageUsage(folder) {
            return __awaiter(this, void 0, void 0, function () {
                var dirents, _i, dirents_1, dirent, path;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, getDirents(resolvePath(folder))];
                        case 1:
                            dirents = _b.sent();
                            _i = 0, dirents_1 = dirents;
                            _b.label = 2;
                        case 2:
                            if (!(_i < dirents_1.length)) return [3 /*break*/, 10];
                            dirent = dirents_1[_i];
                            path = folder + "/" + dirent.name;
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 8, , 9]);
                            if (!dirent.isFile()) return [3 /*break*/, 5];
                            process.stdout.write("Searching into " + path + "\n");
                            return [4 /*yield*/, readFileLineByLine(path, function (line) {
                                    packages.forEach(function (packageName, index) {
                                        if (packageWasUsed(packageName, line)) {
                                            packages.splice(index, 1);
                                        }
                                    });
                                })];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            if (!dirent.isDirectory()) return [3 /*break*/, 7];
                            return [4 /*yield*/, checkPackageUsage(path)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 9:
                            _i++;
                            return [3 /*break*/, 2];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        }
        var packages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPackages()];
                case 1:
                    packages = _a.sent();
                    return [4 /*yield*/, checkPackageUsage('.')];
                case 2:
                    _a.sent();
                    process.stdout.write("Unused packages:\n");
                    packages.forEach(function (packageName) { return process.stdout.write(packageName + "\n"); });
                    return [2 /*return*/];
            }
        });
    });
}
setup();

export { ENCODING };
//# sourceMappingURL=index.mjs.map
