import getDirents from './getDirents.js';
import { options } from './options.js';
import packageWasUsed from './packageWasUsed.js';
import readFileLineByLine from './readFileLineByLine.js';
import resolvePath from './resolvePath.js';

async function checkPackageUsage(folder: string): Promise<void> {
  const dirents = await getDirents(resolvePath(folder));

  for (const dirent of dirents) {
    const path = `${folder}/${dirent.name}`;

    try {
      // Ignore when 'path' matches any item of 'exclude' list.
      if (options.exclude.includes(path)) continue;

      if (dirent.isFile()) {
        process.stdout.write(`Searching into ${path}\n`);

        await readFileLineByLine(path, (line) => {
          options.packagesNames.forEach((packageName, index) => {
            if (packageWasUsed(packageName, line)) {
              options.packagesNames.splice(index, 1);
            }
          });
        });

        continue;
      }

      if (dirent.isDirectory()) {
        await checkPackageUsage(path);

        continue;
      }
    } catch {
      // "CRIME OCORRE NADA ACONTECE FEIIJOADA" - Anônimo
    }
  }
}

export default checkPackageUsage;
