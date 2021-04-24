// @ts-check

import json from '@rollup/plugin-json';
import typescript2 from 'rollup-plugin-typescript2';

import pkg from './package.json';

/**
 * A shebang to execute script with Node.js.
 * @see {@link https://en.wikipedia.org/wiki/Shebang_(Unix)}
 */
const SHEBANG = '#!/usr/bin/env node';

/** Comment with library information (name, version, author and license). */
const PACKAGE_INFORMATION = `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author.name}
 * Released under the ${pkg.license} License.
 */
`;

/** Content appended to top of the bundles. */
const banner = `${SHEBANG}\n${PACKAGE_INFORMATION}`;

/**
 * An object with Rollup.js options.
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: './src/main.ts',
  output: {
    banner,
    file: './dist/main.js',
    format: 'commonjs',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    json(),
    typescript2({
      clean: true,
      tsconfig: './tsconfig.bundle.json',
    }),
  ],
};

export default options;
