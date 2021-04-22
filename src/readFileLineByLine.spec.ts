import fs from 'fs';
import mock from 'mock-fs';
import readFileLineByLine from './readFileLineByLine';

const server = `
'use strict';

const express = require('express');
`;

describe('readFileLineByLine', () => {
  beforeEach(() => {
    mock({ 'server.js': server });
  });

  afterEach(() => mock.restore());

  it('reads a file line-by-line', async () => {
    const onLine = jest.fn();

    await readFileLineByLine('./server.js', onLine);

    const lines = [
      '',
      "'use strict';",
      '',
      "const express = require('express');",
    ];

    lines.forEach((line, index) => {
      expect(onLine).toHaveBeenNthCalledWith(index + 1, line);
    });
  });

  it("rejects when can't read a file", async () => {
    const createReadStream = jest.spyOn(fs, 'createReadStream');

    createReadStream.mockImplementationOnce((file) => {
      throw new Error(`ENOENT, no such file or directory '${file}'`);
    });

    const onLine = jest.fn();

    try {
      await readFileLineByLine('app.js', onLine);
    } catch (error) {
      const message = `ENOENT, no such file or directory '${process.cwd()}/app.js'`;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(message);
    }
  });
});
