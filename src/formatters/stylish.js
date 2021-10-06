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

    const lines = tree.map((node) => {
      switch (node.type) {
        case 'updated': {
          const line1 = `${valIndent}- ${node.key}: ${iter(node.oldValue, depth + 1)}`;
          const line2 = `${valIndent}+ ${node.key}: ${iter(node.newValue, depth + 1)}`;

          return [line1, line2].join(delimiter);
        }
        case 'added':
          return `${valIndent}+ ${node.key}: ${iter(node.newValue, depth + 1)}`;
        case 'removed':
          return `${valIndent}- ${node.key}: ${iter(node.oldValue, depth + 1)}`;
        case 'unchanged':
          return `${valIndent}  ${node.key}: ${iter(node.oldValue, depth + 1)}`;
        case 'nested':
          return `${valIndent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          throw new Error(`Unknown type "${node.type}"`);
      }
    });

    return ['{', ...lines, '}'].join(delimiter);
  };

  return iter(data);
};
