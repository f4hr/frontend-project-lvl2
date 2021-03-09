import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  beforeAll,
  test,
  expect,
} from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// JSON
let tree1Json;
let tree2Json;
// YAML
let tree2Yaml;
let tree1Yaml;
// Result
let stylishtree1ToTree2Diff;
let plainTree1ToTree2Diff;
let jsonTree1ToTree2Diff;

beforeAll(() => {
  // JSON
  tree1Json = `${__dirname}/../__fixtures__/json/tree1.json`;
  tree2Json = `${__dirname}/../__fixtures__/json/tree2.json`;
  // YAML
  tree1Yaml = `${__dirname}/../__fixtures__/yaml/tree1.yml`;
  tree2Yaml = `${__dirname}/../__fixtures__/yaml/tree2.yml`;
  // Result
  stylishtree1ToTree2Diff = readFileSync(`${__dirname}/../__fixtures__/stylish-tree1-tree2.txt`, 'utf-8');
  plainTree1ToTree2Diff = readFileSync(`${__dirname}/../__fixtures__/plain-tree1-tree2.txt`, 'utf-8');
  jsonTree1ToTree2Diff = readFileSync(`${__dirname}/../__fixtures__/json-tree1-tree2.txt`, 'utf-8');
});

test('stylish format', () => {
  expect(genDiff(tree1Json, tree2Yaml)).toBe(stylishtree1ToTree2Diff);
});
test('plain format', () => {
  expect(genDiff(tree1Yaml, tree2Json, 'plain')).toBe(plainTree1ToTree2Diff);
});
test('json format', () => {
  expect(genDiff(tree1Yaml, tree2Json, 'json')).toBe(jsonTree1ToTree2Diff);
});
