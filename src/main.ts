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

    process.stdout.write(`Unused packages:\n`);

    packagesNames.forEach((packageName) => {
      process.stdout.write(`${packageName}\n`);
    });
  });

cli.help();

cli.parse();
