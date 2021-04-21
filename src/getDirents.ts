import fs from 'fs';
import { options } from './options.js';

/**
 * Get a list of dirents from the received path.
 * @param {string} path
 * @returns {Promise<import('fs').Dirent[]>}
 */
function getDirents(path: string): Promise<fs.Dirent[]> {
  const settings = {
    encoding: options.encoding,
    withFileTypes: true,
  } as const;

  return new Promise((resolve, reject) => {
    // TODO: Add option to verbosely display read directories.
    fs.readdir(path, settings, (error, dirents) => {
      if (error) {
        // TODO: Display errors as warnings.
        reject(error);
        return;
      }

      resolve(dirents);
    });
  });
}

export default getDirents;
