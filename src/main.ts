import cac from 'cac';
import getPackages from './getPackages.js';
import { options, setOptions } from './options.js';
import checkPackageUsage from './checkPackageUsage';
import resolveToPaths from './resolveToPaths';
import * as program from '../package.json';

const cli = cac(program.name);

cli.version(program.version);

cli
  .command('[...packages]', 'Check how packages are used.')
  .option(
    '--exclude <A comma separated list of globs>',
    'Specifies a list of globs to be excluded from compilation.',
    {
      type: [],
      default: options.exclude,
    },
  )
  .option(
    '--encoding <A buffer enconding>',
    'Specifies the buffer encondig to be used.',
    { default: options.encoding },
  )
  .action(async (_, args) => {
    const packagesNames = await getPackages();

    // Update options.
    setOptions((options) => ({
      ...options,
      packagesNames,
      encoding: args.encoding,
      exclude: resolveToPaths(args.exclude),
    }));

    await checkPackageUsage('.');

    const packagesUsages = await checkPackageUsage('.');

    const entries = Array.from(packagesUsages.entries());

    const packagesNotImportedAtAll = entries.filter(
      ([, imports]) => imports.length === 0,
    );

    if (packagesNotImportedAtAll.length) {
      process.stdout.write(`Packages not imported at all:\n`);

      packagesNotImportedAtAll.forEach(([packageName]) => {
        const message = ` - '${packageName}' wasn't imported in any source.\n`;
        process.stdout.write(message);
      });
    }

    const packagesOnlyImportedOnce = entries.filter(
      ([, imports]) => imports.length === 1,
    );

    if (packagesOnlyImportedOnce.length) {
      process.stdout.write(`Packages only imported once:\n`);

      packagesOnlyImportedOnce.forEach(([packageName, imports]) =>
        imports.forEach(({ line, file }) => {
          process.stdout.write(`- '${packageName}' was just imported here:\n`);
          process.stdout.write(`  ${file}:${line}\n\n`);
        }),
      );
    }
  });

cli.help();

cli.parse();
