import _ from 'lodash';

const formatValue = (val) => {
  if (_.isPlainObject(val)) return '[complex value]';
  return ((_.isString(val)) ? `'${val}'` : val);
};

export default (data) => {
  const iter = (ast, path = []) => {
    const diff = ast
      .filter(({ status }) => status !== 'unchanged')
      .map(({ key, status, value }) => {
        switch (status) {
          case 'updated': {
            const [oldVal, newVal] = value;
            return `Property '${[...path, key].join('.')}' was updated. From ${formatValue(oldVal)} to ${formatValue(newVal)}`;
          }
          case 'added':
            return `Property '${[...path, key].join('.')}' was added with value: ${formatValue(value)}`;
          case 'removed':
            return `Property '${[...path, key].join('.')}' was removed`;
          case 'nested':
            return iter(value, [...path, key]);
          default:
            throw new Error(`Unknown status "${status}"`);
        }
      });

    return diff.join('\n');
  };

  return iter(data);
};
