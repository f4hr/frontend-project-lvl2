import _ from 'lodash';

const formatValue = (val) => {
  if (_.isPlainObject(val)) return '[complex value]';
  return ((_.isString(val)) ? `'${val}'` : String(val));
};

export default (data) => {
  const iter = (ast, path = []) => {
    const diff = ast
      .map(({
        key,
        type,
        children,
        value1,
        value2,
      }) => {
        switch (type) {
          case 'updated':
            return `Property '${[...path, key].join('.')}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
          case 'added':
            return `Property '${[...path, key].join('.')}' was added with value: ${formatValue(value2)}`;
          case 'removed':
            return `Property '${[...path, key].join('.')}' was removed`;
          case 'nested':
            return iter(children, [...path, key]);
          case 'unchanged':
            return null;
          default:
            throw new Error(`Unknown type "${type}"`);
        }
      });

    return _.compact(diff).join('\n');
  };

  return iter(data);
};
