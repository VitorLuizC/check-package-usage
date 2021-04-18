import type { Dirent } from 'fs';
import * as path from 'path';
import getDirents from './getDirents';

function displayDirent(parent: string, dirent: Dirent): string {
  return path.resolve(parent, dirent.name) + (dirent.isDirectory() ? '/' : '');
}

const parent = '.';

getDirents(path.resolve(parent))
  .then((dirents) => {
    process.stdout.write('List of files and directories: \n');
    dirents.forEach((dirent, index) => {
      const number = (index + 1)
        .toString(10)
        .padStart(dirents.length.toString(10).length, ' ');
      process.stdout.write(`${number}. ${displayDirent(parent, dirent)}\n`);
    });
  })
  .catch((error) => {
    const message = error?.message ?? error ?? 'Unknown error.';
    process.stdout.write(`Error: ${message}\n`);
  });
