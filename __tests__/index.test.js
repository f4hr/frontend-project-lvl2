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

// JSON
let flatJson1;
let flatJson2;
let emptyJson;
let invalidJson;
// YAML
let flatYaml1;
let flatYaml2;
let emptyYaml;
let invalidYaml;
// Result
let flat1To2Diff;
let flat2To1Diff;
let emptyToflat1Diff;
let flat1ToEmptyDiff;

beforeAll(() => {
  // JSON
  flatJson1 = `${__dirname}/../__fixtures__/json/flat1.json`;
  flatJson2 = `${__dirname}/../__fixtures__/json/flat2.json`;
  emptyJson = `${__dirname}/../__fixtures__/json/empty.json`;
  invalidJson = `${__dirname}/../__fixtures__/json/invalid.json`;
  // YAML
  flatYaml1 = `${__dirname}/../__fixtures__/yaml/flat1.yml`;
  flatYaml2 = `${__dirname}/../__fixtures__/yaml/flat2.yml`;
  emptyYaml = `${__dirname}/../__fixtures__/yaml/empty.yml`;
  invalidYaml = `${__dirname}/../__fixtures__/yaml/invalid.yml`;
  // Result
  flat1To2Diff = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  flat2To1Diff = '{\n  + follow: false\n    host: hexlet.io\n  + proxy: 123.234.53.22\n  - timeout: 20\n  + timeout: 50\n  - verbose: true\n}';
  emptyToflat1Diff = '{\n  + follow: false\n  + host: hexlet.io\n  + proxy: 123.234.53.22\n  + timeout: 50\n}';
  flat1ToEmptyDiff = '{\n  - follow: false\n  - host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n}';
});

describe('JSON', () => {
  test('flat', () => {
    expect(genDiff(flatJson1, flatJson2)).toBe(flat1To2Diff);
    expect(genDiff(flatJson2, flatJson1)).toBe(flat2To1Diff);
    expect(genDiff(emptyJson, flatJson1)).toBe(emptyToflat1Diff);
    expect(genDiff(flatJson1, emptyJson)).toBe(flat1ToEmptyDiff);
    expect(() => genDiff(flatJson1, invalidJson)).toThrow(SyntaxError);
    expect(() => genDiff(invalidJson, flatJson1)).toThrow(SyntaxError);
  });
});

describe('YAML', () => {
  test('flat', () => {
    expect(genDiff(flatYaml1, flatYaml2)).toBe(flat1To2Diff);
    expect(genDiff(flatYaml2, flatYaml1)).toBe(flat2To1Diff);
    expect(genDiff(emptyYaml, flatYaml1)).toBe(emptyToflat1Diff);
    expect(genDiff(flatYaml1, emptyYaml)).toBe(flat1ToEmptyDiff);
    expect(() => genDiff(flatYaml1, invalidYaml)).toThrow();
    expect(() => genDiff(invalidYaml, flatYaml1)).toThrow();
  });
});
