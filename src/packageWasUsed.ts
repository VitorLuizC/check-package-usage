/**
 * Check if package was used in import declaration as module specifier.
 * @see {@link https://tc39.es/ecma262/#prod-ImportDeclaration} for more details.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsedInImportDeclaration(
  packageName: string,
  line: string,
): boolean {
  const matcher = new RegExp(`import\\s+['"]${packageName}['"/]`);
  return matcher.test(line);
}

/**
 * Check if package was used in from clause as module specifier.
 * @see {@link https://tc39.es/ecma262/#prod-FromClause} for more details.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsedInFromClause(
  packageName: string,
  line: string,
): boolean {
  const matcher = new RegExp(`from\\s+['"]${packageName}['"/]`);
  return matcher.test(line);
}

/**
 * Check if package was used in require function as id (module name).
 * @see {@link https://nodejs.org/dist/latest-v15.x/docs/api/modules.html#modules_require_id} for more details.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsedInRequireFunction(
  packageName: string,
  line: string,
): boolean {
  const matcher = new RegExp(`require\\([\`'"]${packageName}[\`'"/]`);
  return matcher.test(line);
}

/**
 * Check if package was used in import call as assignment expression.
 * @see {@link https://tc39.es/ecma262/#sec-import-calls} for more details.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsedInImportCall(
  packageName: string,
  line: string,
): boolean {
  const matcher = new RegExp(`import\\([\`'"]${packageName}[\`'"/]`);
  return matcher.test(line);
}

/**
 * Check if package was used.
 * @param {string} packageName
 * @param {string} line
 * @returns {boolean}
 */
function packageWasUsed(packageName: string, line: string): boolean {
  const checkers = [
    packageWasUsedInFromClause,
    packageWasUsedInImportDeclaration,
    packageWasUsedInRequireFunction,
    packageWasUsedInImportCall,
  ];

  return checkers.some((check) => check(packageName, line));
}

export default packageWasUsed;
