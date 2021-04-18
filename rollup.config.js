// @ts-check

import typescript2 from 'rollup-plugin-typescript2';

import pkg from './package.json';

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author.name}
 * Released under the ${pkg.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
  return {
    banner,
    exports: 'named',
    sourcemap: true,
    ...options,
  };
}

/**
 * An object with Rollup.js options.
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: './src/main.ts',
  output: [
    createOutputOptions({
      file: './dist/index.js',
      format: 'commonjs',
    }),
    createOutputOptions({
      file: './dist/index.cjs',
      format: 'commonjs',
    }),
    createOutputOptions({
      file: './dist/index.mjs',
      format: 'esm',
    }),
    createOutputOptions({
      file: './dist/index.esm.js',
      format: 'esm',
    }),
  ],
  plugins: [
    typescript2({
      clean: true,
      tsconfig: './tsconfig.bundle.json',
      useTsconfigDeclarationDir: true,
    }),
  ],
};

export default options;
