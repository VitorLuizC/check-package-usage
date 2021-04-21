import fs from 'fs';
import readline from 'readline';
import resolvePath from './resolvePath.js';
import { options } from './options.js';

/** Representation of `fs.createReadStream` options object. */
type ReadStreamOptions = Parameters<typeof fs.createReadStream>[1];

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
  const readStreamOptions: ReadStreamOptions = {
    encoding: options.encoding,
    flags: 'r', // read-only
  };

  const interfaceOptions: readline.ReadLineOptions = {
    input: fs.createReadStream(resolvePath(path), readStreamOptions),
    terminal: false,
  };

  return new Promise((resolve, reject) => {
    const rl = readline.createInterface(interfaceOptions);

    rl.on('line', onLine);

    rl.on('close', () => {
      resolve();
    });

    rl.on('SIGINT', () => {
      reject(new Error('SIGINT'));
    });
  });
}

export default readFileLineByLine;
