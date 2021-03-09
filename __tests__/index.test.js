import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8', (err) => console.log(err));

test('stylish format', () => {
  const file1 = getFixturePath('/json/tree1.json');
  const file2 = getFixturePath('/yaml/tree2.yml');
  const diff = genDiff(file1, file2);
  const result = readFile('stylish-tree1-tree2.txt');
  expect(diff).toBe(result);
});
test('plain format', () => {
  const file1 = getFixturePath('/yaml/tree1.yml');
  const file2 = getFixturePath('/json/tree2.json');
  const diff = genDiff(file1, file2, 'plain');
  const result = readFile('plain-tree1-tree2.txt');
  expect(diff).toBe(result);
});
test('json format', async () => {
  const file1 = getFixturePath('/yaml/tree1.yml');
  const file2 = getFixturePath('/yaml/tree2.yml');
  const diff = genDiff(file1, file2, 'json');
  const result = readFile('json-tree1-tree2.txt');
  expect(diff).toBe(result);
});
