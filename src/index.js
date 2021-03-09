import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parseData from './parsers.js';
import formatDiff from './formatters/index.js';

const createDiff = (obj1, obj2) => {
  const iter = (data1, data2) => {
    const data1Keys = Object.keys(data1);
    const data2Keys = Object.keys(data2);

    const acc1 = data1Keys.map((key) => {
      const oldVal = data1[key];

      if (data2Keys.includes(key)) {
        const newVal = data2[key];

        if (_.isObject(oldVal) && !_.isNull(oldVal) && _.isObject(newVal) && !_.isNull(newVal)) {
          return { status: 'complex', key, value: iter(oldVal, newVal) };
        }

        if (oldVal !== newVal) {
          return { status: 'updated', key, value: [oldVal, newVal] };
        }

        return { status: 'unchanged', key, value: oldVal };
      }

      return { status: 'removed', key, value: oldVal };
    });

    const acc2 = data2Keys.reduce((acc, key) => {
      if (!data1Keys.includes(key)) {
        acc.push({ status: 'added', key, value: data2[key] });
      }

      return acc;
    }, []);

    return _.sortBy([...acc1, ...acc2], ({ key }) => key);
  };

  return iter(obj1, obj2);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);
  const ext1 = path.extname(path1);
  const ext2 = path.extname(path2);

  const file1Content = readFileSync(path1);
  const file2Content = readFileSync(path2);

  const file1Parsed = parseData(file1Content, ext1);
  const file2Parsed = parseData(file2Content, ext2);

  const diff = createDiff(file1Parsed, file2Parsed);

  return formatDiff(diff, formatName);
};

export default genDiff;
