import _ from 'lodash';

const formatValue = (val) => {
  if (_.isPlainObject(val)) return '[complex value]';
  return ((_.isString(val)) ? `'${val}'` : val);
};

export default (data) => {
  const iter = (ast, path = []) => {
    const diff = ast
      .filter(({ type }) => type !== 'unchanged')
      .map((node) => {
        switch (node.type) {
          case 'updated':
            return `Property '${[...path, node.key].join('.')}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
          case 'added':
            return `Property '${[...path, node.key].join('.')}' was added with value: ${formatValue(node.newValue)}`;
          case 'removed':
            return `Property '${[...path, node.key].join('.')}' was removed`;
          case 'nested':
            return iter(node.children, [...path, node.key]);
          default:
            throw new Error(`Unknown type "${node.type}"`);
        }
      });

    return diff.join('\n');
  };

  return iter(data);
};
