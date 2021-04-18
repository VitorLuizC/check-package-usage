import getDirents from './getDirents';
import getPackages from './getPackages';
import packageWasUsed from './packageWasUsed';
import readFileLineByLine from './readFileLineByLine';
import resolvePath from './resolvePath';

export const ENCODING = 'utf-8';

async function setup() {
  const packages = await getPackages();

  async function checkPackageUsage(folder: string) {
    const dirents = await getDirents(resolvePath(folder));

    for (const dirent of dirents) {
      const path = `${folder}/${dirent.name}`;

      try {
        if (dirent.isFile()) {
          process.stdout.write(`Searching into ${path}\n`);

          await readFileLineByLine(path, (line) => {
            packages.forEach((packageName, index) => {
              if (packageWasUsed(packageName, line)) {
                packages.splice(index, 1);
              }
            });
          });
        }

        if (dirent.isDirectory()) await checkPackageUsage(path);
      } catch {
        // "CRIME OCORRE NADA ACONTECE FEIIJOADA" - Anônimo
      }
    }
  }

  await checkPackageUsage('.');

  process.stdout.write(`Unused packages:\n`);
  packages.forEach((packageName) => process.stdout.write(`${packageName}\n`));
}

setup();
