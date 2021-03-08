import { readFileSync } from 'fs';
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
let tree1Json;
let tree2Json;
// YAML
let flatYaml1;
let flatYaml2;
let emptyYaml;
let invalidYaml;
let tree2Yaml;
let tree1Yaml;
// Result
let flat1ToFlat2Diff;
let flat2ToFlat1Diff;
let emptyToFlat1Diff;
let flat1ToEmptyDiff;
let tree1ToTree2Diff;
let plainFlat1ToFlat2Diff;
let plainTree1ToTree2Diff;

beforeAll(() => {
  // JSON
  flatJson1 = `${__dirname}/../__fixtures__/json/flat1.json`;
  flatJson2 = `${__dirname}/../__fixtures__/json/flat2.json`;
  emptyJson = `${__dirname}/../__fixtures__/json/empty.json`;
  invalidJson = `${__dirname}/../__fixtures__/json/invalid.json`;
  tree1Json = `${__dirname}/../__fixtures__/json/tree1.json`;
  tree2Json = `${__dirname}/../__fixtures__/json/tree2.json`;
  // YAML
  flatYaml1 = `${__dirname}/../__fixtures__/yaml/flat1.yml`;
  flatYaml2 = `${__dirname}/../__fixtures__/yaml/flat2.yml`;
  emptyYaml = `${__dirname}/../__fixtures__/yaml/empty.yml`;
  invalidYaml = `${__dirname}/../__fixtures__/yaml/invalid.yml`;
  tree1Yaml = `${__dirname}/../__fixtures__/yaml/tree1.yml`;
  tree2Yaml = `${__dirname}/../__fixtures__/yaml/tree2.yml`;
  // Result
  flat1ToFlat2Diff = readFileSync(`${__dirname}/../__fixtures__/flat1-flat2.txt`, 'utf-8');
  flat2ToFlat1Diff = readFileSync(`${__dirname}/../__fixtures__/flat2-flat1.txt`, 'utf-8');
  emptyToFlat1Diff = readFileSync(`${__dirname}/../__fixtures__/empty-flat1.txt`, 'utf-8');
  flat1ToEmptyDiff = readFileSync(`${__dirname}/../__fixtures__/flat1-empty.txt`, 'utf-8');
  tree1ToTree2Diff = readFileSync(`${__dirname}/../__fixtures__/tree1-tree2.txt`, 'utf-8');
  plainFlat1ToFlat2Diff = readFileSync(`${__dirname}/../__fixtures__/plain-flat1-flat2.txt`, 'utf-8');
  plainTree1ToTree2Diff = readFileSync(`${__dirname}/../__fixtures__/plain-tree1-tree2.txt`, 'utf-8');
});

describe('JSON', () => {
  test('flat', () => {
    expect(genDiff(flatJson1, flatJson2)).toBe(flat1ToFlat2Diff);
    expect(genDiff(flatJson2, flatJson1)).toBe(flat2ToFlat1Diff);
    expect(genDiff(emptyJson, flatJson1)).toBe(emptyToFlat1Diff);
    expect(genDiff(flatJson1, emptyJson)).toBe(flat1ToEmptyDiff);
    expect(() => genDiff(flatJson1, invalidJson)).toThrow(SyntaxError);
    expect(() => genDiff(invalidJson, flatJson1)).toThrow(SyntaxError);
  });
  test('tree', () => {
    expect(genDiff(tree1Json, tree2Json)).toBe(tree1ToTree2Diff);
  });
});

describe('YAML', () => {
  test('flat', () => {
    expect(genDiff(flatYaml1, flatYaml2)).toBe(flat1ToFlat2Diff);
    expect(genDiff(flatYaml2, flatYaml1)).toBe(flat2ToFlat1Diff);
    expect(genDiff(emptyYaml, flatYaml1)).toBe(emptyToFlat1Diff);
    expect(genDiff(flatYaml1, emptyYaml)).toBe(flat1ToEmptyDiff);
    expect(() => genDiff(flatYaml1, invalidYaml)).toThrow();
    expect(() => genDiff(invalidYaml, flatYaml1)).toThrow();
  });
  test('tree', () => {
    expect(genDiff(tree1Yaml, tree2Yaml)).toBe(tree1ToTree2Diff);
  });
});

describe('Plain format', () => {
  test('flat', () => {
    expect(genDiff(flatJson1, flatYaml2, 'plain')).toBe(plainFlat1ToFlat2Diff);
  });
  test('tree', () => {
    expect(genDiff(tree1Yaml, tree2Json, 'plain')).toBe(plainTree1ToTree2Diff);
  });
});
