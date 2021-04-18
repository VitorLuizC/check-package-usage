import * as fs from 'fs';

const ENCODING = 'utf-8';

/**
 * Get a list of dirents from the received path.
 * @param {string} path
 * @returns {Promise<import('fs').Dirent[]>}
 */
function getDirents(path: string): Promise<fs.Dirent[]> {
  const options = {
    encoding: ENCODING,
    withFileTypes: true,
  } as const;

  return new Promise((resolve, reject) => {
    // TODO: Add option to verbosely display read directories.
    fs.readdir(path, options, (error, dirents) => {
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
