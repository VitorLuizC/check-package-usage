import getPackages from './getPackages';

jest.mock('../package.json', () => ({
  dependencies: {
    tslib: '^2.2.0',
  },
  devDependencies: {
    '@types/eslint': '^7.2.9',
    '@types/jest': '^26.0.22',
    '@types/mock-fs': '^4.13.0',
    '@types/node': '^14.14.41',
    '@types/prettier': '^2.2.3',
    '@typescript-eslint/eslint-plugin': '^4.21.0',
    '@typescript-eslint/parser': '^4.21.0',
    'concurrently': '^6.0.2',
    'eslint': '^7.24.0',
    'eslint-config-prettier': '^8.1.0',
    'eslint-plugin-prettier': '^3.3.1',
    'jest': '^26.6.3',
    'mock-fs': '^4.13.0',
    'prettier': '^2.2.1',
    'rollup': '^2.45.1',
    'rollup-plugin-typescript2': '^0.30.0',
    'ts-jest': '^26.5.4',
    'ts-jest-resolver': '^1.0.0',
    'typescript': '^4.2.4',
  },
}));

describe('getPackages', () => {
  it('returns a Promise with package names', async () => {
    const packages = await getPackages();

    expect(packages).toEqual([
      'tslib',
      '@types/eslint',
      '@types/jest',
      '@types/mock-fs',
      '@types/node',
      '@types/prettier',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'concurrently',
      'eslint',
      'eslint-config-prettier',
      'eslint-plugin-prettier',
      'jest',
      'mock-fs',
      'prettier',
      'rollup',
      'rollup-plugin-typescript2',
      'ts-jest',
      'ts-jest-resolver',
      'typescript',
    ]);
  });
});
