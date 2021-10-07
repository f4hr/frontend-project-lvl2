import _ from 'lodash';

const defaultOptions = {
  replacer: ' ',
  spacesCount: 4,
};

export default (data, options = defaultOptions) => {
  const currentOptions = { ...defaultOptions, ...options };
  const { replacer, spacesCount } = currentOptions;
  const baseIndent = replacer.repeat(spacesCount);
  const valIndent = baseIndent.substring(0, baseIndent.length - 2);

  const iter = (tree, depth = 0) => {
    if (!_.isObject(tree)) return String(tree);

    const delimiter = `\n${baseIndent.repeat(depth)}`;

    if (_.isPlainObject(tree)) {
      const lines = _.keys(tree).map((key) => `${valIndent}  ${key}: ${iter(tree[key], depth + 1)}`);

      return ['{', ...lines, '}'].join(delimiter);
    }

    const lines = tree.map(({
      key,
      type,
      children,
      value1,
      value2,
    }) => {
      switch (type) {
        case 'updated': {
          const line1 = `${valIndent}- ${key}: ${iter(value1, depth + 1)}`;
          const line2 = `${valIndent}+ ${key}: ${iter(value2, depth + 1)}`;

          return [line1, line2].join(delimiter);
        }
        case 'added':
          return `${valIndent}+ ${key}: ${iter(value2, depth + 1)}`;
        case 'removed':
          return `${valIndent}- ${key}: ${iter(value1, depth + 1)}`;
        case 'unchanged':
          return `${valIndent}  ${key}: ${iter(value1, depth + 1)}`;
        case 'nested':
          return `${valIndent}  ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Unknown type "${type}"`);
      }
    });

    return ['{', ...lines, '}'].join(delimiter);
  };

  return iter(data);
};
