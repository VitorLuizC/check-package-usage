import { Options, options, setOptions } from './options';

describe('options', () => {
  it('exports options object', () => {
    expect(options).toEqual({
      encoding: 'utf-8',
      exclude: ['./.git', './node_modules'],
    });
  });
});

describe('setOptions', () => {
  it('returns updated options object', () => {
    const updatedOptions = setOptions((options) => ({
      ...options,
      encoding: 'base64',
      exclude: ['./.git', './node_modules', './dist'],
    }));

    expect(updatedOptions).toEqual({
      encoding: 'base64',
      exclude: ['./.git', './node_modules', './dist'],
    });
  });

  it('updates options object', () => {
    setOptions((options) => ({
      ...options,
      encoding: 'latin1',
    }));

    expect(options).toEqual({
      encoding: 'latin1',
      exclude: ['./.git', './node_modules'],
    });
  });
});
