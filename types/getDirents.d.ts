/// <reference types="node" />
import * as fs from 'fs';
/**
 * Get a list of dirents from the received path.
 * @param {string} path
 * @returns {Promise<import('fs').Dirent[]>}
 */
declare function getDirents(path: string): Promise<fs.Dirent[]>;
export default getDirents;
//# sourceMappingURL=getDirents.d.ts.map