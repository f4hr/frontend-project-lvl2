import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parseData from './parsers.js';
import formatDiff from './formatters.js';

const defaultOptions = {
  format: 'stylish',
};

const createDiff = (data1, data2) => {
  const diff = data1.reduce((acc, { key: key1, value: val1 }) => {
    const value = [val1];
    let status = 'deleted';

    data2.forEach(({ key: key2, value: val2 }) => {
      if (key1 === key2 && val1 === val2) {
        status = 'unchanged';
      }
      if (key1 === key2 && val1 !== val2) {
        status = 'updated';
        value.push(val2);
      }
    });

    acc.push({ key: key1, value, status });

    return acc;
  }, []);

  data2.forEach(({ key: key1, value: val2 }) => {
    let exists = false;

    for (let i = 0; i < diff.length; i += 1) {
      const { key: key2 } = diff[i];

      if (key1 === key2) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      diff.push({ key: key1, value: [val2], status: 'added' });
    }
  });

  return diff;
};

const genDiff = (filepath1, filepath2, options = defaultOptions) => {
  const { format } = options;

  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);
  const ext1 = path.extname(path1);
  const ext2 = path.extname(path2);

  const file1Content = readFileSync(path1);
  const file2Content = readFileSync(path2);

  const file1Parsed = parseData(file1Content, ext1);
  const file2Parsed = parseData(file2Content, ext2);

  const diff = createDiff(file1Parsed, file2Parsed);

  const sorted = _.sortBy(diff, ({ key }) => key);

  return formatDiff(sorted, format);
};

export default genDiff;
