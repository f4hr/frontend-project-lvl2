import _ from 'lodash';

const defaultOptions = {
  replacer: ' ',
  spacesCount: 4,
};

const buildLine = (key, status, value, indent) => {
  switch (status) {
    case 'added':
      return `${indent}+ ${key}: ${value}`;
    case 'removed':
      return `${indent}- ${key}: ${value}`;
    case 'unchanged':
    case 'nested':
      return `${indent}  ${key}: ${value}`;
    default:
      throw new Error(`Unknown status "${status}"`);
  }
};

export default (data, options = defaultOptions) => {
  const currentOptions = { ...defaultOptions, ...options };
  const { replacer, spacesCount } = currentOptions;
  const indent = replacer.repeat(spacesCount);
  const valueIndent = indent.substring(0, indent.length - 2);

  const iter = (tree, depth) => {
    if (!_.isObject(tree)) return String(tree);

    const delimiter = `\n${indent.repeat(depth)}`;

    if (_.isPlainObject(tree)) {
      const keys = Object.keys(tree);

      const lines = keys.map((key) => {
        const value = iter(tree[key], depth + 1);

        return buildLine(key, 'unchanged', value, valueIndent);
      });

      return ['{', ...lines, '}'].join(delimiter);
    }

    const lines = tree.reduce((acc, { status: stat, key, value }) => {
      if (stat === 'updated') {
        const val1 = iter(value[0], depth + 1);
        const val2 = iter(value[1], depth + 1);

        const line1 = buildLine(key, 'removed', val1, valueIndent);
        const line2 = buildLine(key, 'added', val2, valueIndent);

        return [...acc, line1, line2];
      }

      const val = iter(value, depth + 1);
      const line = buildLine(key, stat, val, valueIndent);

      return [...acc, line];
    }, []);

    return ['{', ...lines, '}'].join(delimiter);
  };

  return iter(data, 0);
};
