import resolvePath from './resolvePath.js';

describe('resolvePath', () => {
  it('returns path with process.cwd', () => {
    expect(resolvePath('package.json')).toBe(`${process.cwd()}/package.json`);
  });
});
