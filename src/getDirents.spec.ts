import fs from 'fs';
import mock from 'mock-fs';
import getDirents from './getDirents';
import { setOptions } from './options';

describe('getDirents', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'readdir');

    mock({
      '.gitignore': 'node_modules',
      'src': mock.directory({
        items: {
          'file.txt': 'Empty :P\n',
        },
      }),
    });
  });

  afterEach(() => mock.restore());

  it('returns a Promise with the list of dirents', async () => {
    const dirents = await getDirents('.');

    expect(dirents).toEqual([
      expect.objectContaining({ name: '.gitignore' }),
      expect.objectContaining({ name: 'src' }),
    ]);
  });

  it('uses `fs.readdir` with received path and the encoding from options', async () => {
    setOptions((options) => ({
      ...options,
      encoding: 'base64',
    }));

    await getDirents('.');

    expect(fs.readdir).toHaveBeenCalledWith(
      '.',
      expect.objectContaining({ encoding: 'base64' }),
      expect.any(Function),
    );
  });

  it('rejects when `fs.readdir` callback has an error', async () => {
    const folder = './FOLDER_THAT_DOES_NOT_EXIST';

    try {
      await getDirents(folder);
    } catch (error) {
      const message = `ENOENT, no such file or directory '${folder}'`;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(message);
    }
  });
});
