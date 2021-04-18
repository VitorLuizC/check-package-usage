import fs from 'fs';
import readline from 'readline';
import resolvePath from './resolvePath';
import { ENCODING } from './main';

/**
 * Reads the file line-by-line and calls 'onLine' callback for each one of them.
 * @param {string} path
 * @param {(line: string) => void} onLine
 * @returns {Promise<void>}
 */
function readFileLineByLine(
  path: string,
  onLine: (line: string) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = readline.createInterface({
      input: fs.createReadStream(resolvePath(path), {
        flags: 'r',
        encoding: ENCODING,
      }),
      terminal: false,
    });

    file.on('line', onLine);

    file.on('close', () => {
      resolve();
    });

    file.on('SIGINT', () => {
      reject(new Error('SIGINT'));
    });
  });
}

export default readFileLineByLine;
