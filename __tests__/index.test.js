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
let invalidJson;
let tree1Json;
let tree2Json;
// YAML
let flatYaml1;
let flatYaml2;
let tree2Yaml;
let tree1Yaml;
// Result
let stylishflat1ToFlat2Diff;
let stylishtree1ToTree2Diff;
let plainFlat1ToFlat2Diff;
let plainTree1ToTree2Diff;
let jsonFlat1ToFlat2Diff;
let jsonTree1ToTree2Diff;

beforeAll(() => {
  // JSON
  flatJson1 = `${__dirname}/../__fixtures__/json/flat1.json`;
  invalidJson = `${__dirname}/../__fixtures__/json/invalid.json`;
  tree1Json = `${__dirname}/../__fixtures__/json/tree1.json`;
  tree2Json = `${__dirname}/../__fixtures__/json/tree2.json`;
  // YAML
  flatYaml1 = `${__dirname}/../__fixtures__/yaml/flat1.yml`;
  flatYaml2 = `${__dirname}/../__fixtures__/yaml/flat2.yml`;
  tree1Yaml = `${__dirname}/../__fixtures__/yaml/tree1.yml`;
  tree2Yaml = `${__dirname}/../__fixtures__/yaml/tree2.yml`;
  // Result
  stylishflat1ToFlat2Diff = readFileSync(`${__dirname}/../__fixtures__/stylish-flat1-flat2.txt`, 'utf-8');
  stylishtree1ToTree2Diff = readFileSync(`${__dirname}/../__fixtures__/stylish-tree1-tree2.txt`, 'utf-8');
  plainFlat1ToFlat2Diff = readFileSync(`${__dirname}/../__fixtures__/plain-flat1-flat2.txt`, 'utf-8');
  plainTree1ToTree2Diff = readFileSync(`${__dirname}/../__fixtures__/plain-tree1-tree2.txt`, 'utf-8');
  jsonFlat1ToFlat2Diff = readFileSync(`${__dirname}/../__fixtures__/json-flat1-flat2.txt`, 'utf-8');
  jsonTree1ToTree2Diff = readFileSync(`${__dirname}/../__fixtures__/json-tree1-tree2.txt`, 'utf-8');
});

describe('Stylish format', () => {
  test('flat', () => {
    expect(genDiff(flatJson1, flatYaml2)).toBe(stylishflat1ToFlat2Diff);
    expect(() => genDiff(flatYaml1, invalidJson)).toThrow();
    expect(() => genDiff(invalidJson, flatYaml1)).toThrow();
  });
  test('tree', () => {
    expect(genDiff(tree1Json, tree2Yaml)).toBe(stylishtree1ToTree2Diff);
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

describe('JSON format', () => {
  test('flat', () => {
    expect(genDiff(flatJson1, flatYaml2, 'json')).toBe(jsonFlat1ToFlat2Diff);
  });
  test('tree', () => {
    expect(genDiff(tree1Yaml, tree2Json, 'json')).toBe(jsonTree1ToTree2Diff);
  });
});
