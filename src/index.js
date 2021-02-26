import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const defaultOptions = {
  format: 'stylish',
};

const objToArrOfObj = (object) => Object.entries(object).map(([key, value]) => ({ key, value }));

const formatStylish = (entries) => {
  const lines = [];

  lines.push('{');
  entries.forEach(({ key, value, status }) => {
    const tab = '  ';

    switch (status) {
      case 'deleted':
        lines.push(`${tab}- ${key}: ${value}`);
        break;
      case 'added':
        lines.push(`${tab}+ ${key}: ${value}`);
        break;
      case 'updated':
        lines.push(`${tab}- ${key}: ${value[0]}`);
        lines.push(`${tab}+ ${key}: ${value[1]}`);
        break;
      default:
        lines.push(`${tab}  ${key}: ${value}`);
    }
  });
  lines.push('}');

  return lines.join('\n');
};

const formatDiff = (entries, format) => {
  switch (format) {
    default:
      return formatStylish(entries);
  }
};

const genJsonDiff = (file1Content, file2Content) => {
  const json1 = JSON.parse(file1Content);
  const json2 = JSON.parse(file2Content);

  const json1Arr = objToArrOfObj(json1);
  const json2Arr = objToArrOfObj(json2);

  const diff = json1Arr.reduce((acc, { key: key1, value: val1 }) => {
    let status = 'deleted';
    const value = [val1];

    json2Arr.forEach(({ key: key2, value: val2 }) => {
      if (key1 === key2) {
        if (val1 === val2) {
          status = 'unchanged';
        } else {
          status = 'updated';
          value.push(val2);
        }
      }
    });

    acc.push({
      key: key1,
      value,
      status,
    });

    return acc;
  }, []);
  json2Arr.forEach(({ key: key1, value: val2 }) => {
    let exists = false;

    for (let i = 0; i < diff.length; i += 1) {
      const { key: key2 } = diff[i];

      if (key1 === key2) {
        exists = true;

        break;
      }
    }

    if (!exists) {
      diff.push({
        key: key1,
        value: [val2],
        status: 'added',
      });
    }
  });

  return diff;
};

const createDiff = (file1Content, file2Content, format) => {
  switch (format) {
    default:
      return genJsonDiff(file1Content, file2Content);
  }
};

const genDiff = (filepath1, filepath2, options = defaultOptions) => {
  const { format } = options;

  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);

  const file1Content = readFileSync(path1);
  const file2Content = readFileSync(path2);

  const diff = createDiff(file1Content, file2Content, format);

  const sorted = _.sortBy(diff, ({ key }) => key);

  return formatDiff(sorted, format);
};

export default genDiff;
