import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import getAst from './ast.js';
import formatDiff from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);
  const ext1 = path.extname(path1).substring(1);
  const ext2 = path.extname(path2).substring(1);

  const file1 = readFileSync(path1);
  const file2 = readFileSync(path2);

  const file1Content = parse(file1, ext1);
  const file2Content = parse(file2, ext2);

  const diff = getAst(file1Content, file2Content);

  return formatDiff(diff, formatName);
};
