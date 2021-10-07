import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import getAst from './ast.js';
import formatDiff from './formatters/index.js';

const getPath = (filePath) => path.resolve(filePath);
const getExtension = (filePath) => path.extname(filePath).substring(1);
const getContent = (filePath) => readFileSync(filePath);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const ext1 = getExtension(path1);
  const ext2 = getExtension(path2);

  const file1 = getContent(path1);
  const file2 = getContent(path2);

  const file1Content = parse(file1, ext1);
  const file2Content = parse(file2, ext2);

  const diff = getAst(file1Content, file2Content);

  return formatDiff(diff, formatName);
};
