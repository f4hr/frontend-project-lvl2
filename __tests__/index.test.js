import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  beforeAll,
  describe,
  test,
  expect,
} from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let plainJson1;
let plainJson2;
let emptyJson;
let invalidJson;
let plain1To2Diff;
let plain2To1Diff;
let emptyToPlain1Diff;
let plain1ToEmptyDiff;

beforeAll(() => {
  plainJson1 = `${__dirname}/../__fixtures__/plain1.json`;
  plainJson2 = `${__dirname}/../__fixtures__/plain2.json`;
  emptyJson = `${__dirname}/../__fixtures__/empty.json`;
  invalidJson = `${__dirname}/../__fixtures__/invalid.json`;
  plain1To2Diff = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  plain2To1Diff = '{\n  + follow: false\n    host: hexlet.io\n  + proxy: 123.234.53.22\n  - timeout: 20\n  + timeout: 50\n  - verbose: true\n}';
  emptyToPlain1Diff = '{\n  + follow: false\n  + host: hexlet.io\n  + proxy: 123.234.53.22\n  + timeout: 50\n}';
  plain1ToEmptyDiff = '{\n  - follow: false\n  - host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n}';
});

describe('flat JSON', () => {
  test('valid and valid', () => {
    expect(genDiff(plainJson1, plainJson2)).toBe(plain1To2Diff);
    expect(genDiff(plainJson1, plainJson2, { format: 'stylish' })).toBe(plain1To2Diff);
    expect(genDiff(plainJson2, plainJson1)).toBe(plain2To1Diff);
    expect(genDiff(plainJson2, plainJson1, { format: 'stylish' })).toBe(plain2To1Diff);
  });
  test('empty and valid', () => {
    expect(genDiff(emptyJson, plainJson1)).toBe(emptyToPlain1Diff);
    expect(genDiff(plainJson1, emptyJson)).toBe(plain1ToEmptyDiff);
  });
  test('invalid', () => {
    expect(() => genDiff(plainJson1, invalidJson)).toThrow(SyntaxError);
    expect(() => genDiff(invalidJson, plainJson1)).toThrow(SyntaxError);
  });
});
