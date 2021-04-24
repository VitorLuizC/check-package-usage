import cac from 'cac';
import getPackages from './getPackages.js';
import isTypeOf from './predicates/isTypeOf.js';
import isArrayOf from './predicates/isArrayOf.js';
import { options, setOptions } from './options.js';
import checkPackageUsage from './checkPackageUsage';
import * as program from '../package.json';

const isValid = /*__PURE__*/ isArrayOf(isTypeOf('string'));

/**
 * Resolve arguments to a list of paths.
 * @param {unknown} value
 * @returns {string[]}
 */
function resolveToListOfPaths(value: unknown): string[] {
  if (!isValid(value)) return [];

  return value.flatMap((paths: string) => paths.split(','));
}

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
    // Update options.
    setOptions((options) => ({
      ...options,
      encoding: args.encoding,
      exclude: resolveToListOfPaths(args.exclude),
    }));

    const packagesNames = await getPackages();

    await checkPackageUsage('.', packagesNames);

    process.stdout.write(`Unused packages:\n`);

    packagesNames.forEach((packageName) => {
      process.stdout.write(`${packageName}\n`);
    });
  });

cli.help();

cli.parse();
