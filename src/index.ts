import type { Dirent } from 'fs';
import * as path from 'path';
import getDirents from './getDirents';

/**
 * Formats received dirent to display in the corrent way.
 * @param {string} parent
 * @param {import('fs').Dirent} dirent
 * @returns {string}
 */
function formatDirent(parent: string, dirent: Dirent): string {
  return path.resolve(parent, dirent.name) + (dirent.isDirectory() ? '/' : '');
}

/**
 * Resolve path with received segments.
 * @param {...string} segments
 * @returns {string}
 */
function resolvePath(...segments: string[]): string {
  return path.resolve(process.cwd(), ...segments);
}

const parent = '.';

getDirents(resolvePath(parent))
  .then((dirents) => {
    process.stdout.write('List of files and directories: \n');
    dirents.forEach((dirent, index) => {
      const maxLength = dirents.length.toString(10).length;
      const number = (index + 1).toString(10).padStart(maxLength, ' ');
      process.stdout.write(`${number}. ${formatDirent(parent, dirent)}\n`);
    });
  })
  .catch((error) => {
    const message = error?.message ?? error ?? 'Unknown error.';
    process.stdout.write(`Error: ${message}\n`);
  });
