import packageWasUsed from './packageWasUsed';

describe('packageWasUsed', () => {
  it("returns `true` when package name is used as from clause's module specifier", () => {
    const packageName = 'react';

    const lines = [
      "import { useState } from 'react';",
      'import React from "react"',
      'import * as React from "react";',
    ];

    lines.forEach((line) => {
      expect(packageWasUsed(packageName, line)).toBe(true);
    });

    const lineWherePackageIsNotUsed = 'class Button extends React.Component';

    expect(packageWasUsed(packageName, lineWherePackageIsNotUsed)).toBe(false);
  });

  it("returns `true` when package name is used as import declaration's module specifier", () => {
    const packageName = 'regenerator-runtime';

    const lines = [
      "import 'regenerator-runtime';",
      'import "regenerator-runtime"',
    ];

    lines.forEach((line) => {
      expect(packageWasUsed(packageName, line)).toBe(true);
    });

    const lineWherePackageIsNotUsed = '  regeneratorRuntime();';

    expect(packageWasUsed(packageName, lineWherePackageIsNotUsed)).toBe(false);
  });

  it("returns `true` when package name is used as require function's id", () => {
    const packageName = 'express';

    const lines = [
      "const express = require('express');",
      'let app = require("express")()',
    ];

    lines.forEach((line) => {
      expect(packageWasUsed(packageName, line)).toBe(true);
    });

    const lineWherePackageIsNotUsed = '  express(server);';

    expect(packageWasUsed(packageName, lineWherePackageIsNotUsed)).toBe(false);
  });

  it("returns `true` when package name is used as import call's assignment expression", () => {
    const packageName = 'intl-polyfill';

    const lines = [
      "import('intl-polyfill')",
      "const Intl = await import('intl-polyfill')",
    ];

    lines.forEach((line) => {
      expect(packageWasUsed(packageName, line)).toBe(true);
    });

    const lineWherePackageIsNotUsed = "new Intl.DateTimeFormat('en-US');";

    expect(packageWasUsed(packageName, lineWherePackageIsNotUsed)).toBe(false);
  });
});
