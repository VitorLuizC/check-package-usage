import getDirents from './getDirents.js';
import { options } from './options.js';
import packageWasUsed from './packageWasUsed.js';
import readFileLineByLine from './readFileLineByLine.js';
import resolvePath from './resolvePath.js';

type Usage = {
  line: number;
  file: string;
};

const store = new Map<string, Usage[]>();

function checkPackagesUsageInFile(file: string): Promise<void> {
  process.stdout.write(`Searching into ${file}\n`);
  // The line number.
  let number = 0;

  return readFileLineByLine(file, (line) => {
    number++;

    options.packagesNames.forEach((packageName) => {
      if (!packageWasUsed(packageName, line)) return;

      const usage = {
        file,
        line: number,
      };

      const usages = store.get(packageName) ?? [];

      store.set(packageName, [...usages, usage]);
    });
  });
}

async function checkPackagesUsageInDirectory(folder: string): Promise<void> {
  const dirents = await getDirents(folder);

  for (const dirent of dirents) {
    const path = `${folder}/${dirent.name}`;

    try {
      // Ignore when 'path' matches any item of 'exclude' list.
      if (options.exclude.includes(path)) continue;
      else if (dirent.isFile()) await checkPackagesUsageInFile(path);
      else if (dirent.isDirectory()) await checkPackagesUsageInDirectory(path);
    } catch (error) {
      process.stdout.write(`Error: ${error || error.message}\n`);
    }
  }
}

async function checkPackageUsage(path: string): Promise<Map<string, Usage[]>> {
  options.packagesNames.forEach((packageName) => {
    // Initialize store with all the package names.
    store.set(packageName, []);
  });

  await checkPackagesUsageInDirectory(resolvePath(path));

  return store;
}

export default checkPackageUsage;
