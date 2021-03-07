import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parseData from './parsers.js';
import formatDiff from './formatters.js';

const defaultOptions = { format: 'stylish' };

const createDiff = (obj1, obj2) => {
  const iter = (data1, data2, acc) => {
    const data1Keys = Object.keys(data1);
    const data2Keys = Object.keys(data2);
    let deleted = false;

    for (let i = 0; i < data1Keys.length; i += 1) {
      const key = data1Keys[i];
      const oldVal = data1[key];

      if (data2Keys.includes(key)) {
        const newVal = data2[key];

        if (_.isObject(oldVal) && !_.isNull(oldVal) && _.isObject(newVal) && !_.isNull(newVal)) {
          if (_.isEqual(oldVal, newVal)) {
            acc.push({ status: 'unchanged', key, value: oldVal });
          } else {
            acc.push({ status: 'subobj', key, value: iter(oldVal, newVal, []) });
          }
        } else if (oldVal !== newVal) {
          acc.push({ status: 'updated', key, value: [oldVal, newVal] });
        } else {
          acc.push({ status: 'unchanged', key, value: oldVal });
        }
      } else {
        acc.push({ status: 'removed', key, value: oldVal });
        deleted = true;
      }
    }

    if (!deleted && data2Keys.length === data1Keys.length) {
      return acc;
    }

    for (let k = 0; k < data2Keys.length; k += 1) {
      const key = data2Keys[k];

      if (!data1Keys.includes(key)) {
        acc.push({ status: 'added', key, value: data2[key] });
      }
    }

    return _.sortBy(acc, ({ key }) => key);
  };
  const diff = iter(obj1, obj2, []);

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

  return formatDiff(diff, format);
};

export default genDiff;
