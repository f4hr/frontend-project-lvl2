import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect, describe } from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('Formatters', () => {
  describe('Valid input', () => {
    test.each([
      ['stylish', 'json'],
      ['stylish', 'yaml'],
      ['plain', 'json'],
      ['plain', 'yaml'],
      ['json', 'json'],
      ['json', 'yaml'],
    ])('"%s" formatter with "%s" format', (style, format) => {
      const file1 = getFixturePath(`/${format}/tree1.${format}`);
      const file2 = getFixturePath(`/${format}/tree2.${format}`);
      const diff = genDiff(file1, file2, style);
      const result = readFile(`${style}.txt`);
      expect(diff).toBe(result);
    });
  });
  describe('Invalid input', () => {
    test('Should throw an error when no input provided', () => {
      expect(() => genDiff()).toThrow();
    });
    test('Should throw an error when one of the inputs is not provided', () => {
      const file1 = getFixturePath('/json/tree1.json');
      expect(() => genDiff(file1)).toThrow();
    });
    test('Should throw an error when one of the files is not found', () => {
      const file1 = getFixturePath('/json/tree1.json');
      const file2 = getFixturePath('/json/tree3.json');
      expect(() => genDiff(file1, file2)).toThrow();
    });
    test('Should throw an error when invalid formatter is specified', () => {
      const file1 = getFixturePath('/json/tree1.json');
      const file2 = getFixturePath('/json/tree2.json');
      expect(() => genDiff(file1, file2, 'foo')).toThrow();
    });
  });
});
