/**
 * Reads the file line-by-line and calls 'onLine' callback for each one of them.
 * @param {string} path
 * @param {(line: string) => void} onLine
 * @returns {Promise<void>}
 */
declare function readFileLineByLine(path: string, onLine: (line: string) => void): Promise<void>;
export default readFileLineByLine;
//# sourceMappingURL=readFileLineByLine.d.ts.map