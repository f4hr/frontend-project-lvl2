const stylishDefaultOptions = {
  replacer: ' ',
  spacesCount: 4,
};

const stylishStatusValues = {
  removed: '- ',
  added: '+ ',
  unchanged: '  ',
  complex: '  ',
};

const buildLine = (status, key, value, indent) => `${indent}${stylishStatusValues[status]}${key}: ${value}`;

export default (data, options = stylishDefaultOptions) => {
  const currentOptions = { ...stylishDefaultOptions, ...options };
  const { replacer, spacesCount } = currentOptions;
  const indent = replacer.repeat(spacesCount);
  const indentForValue = indent.substring(0, indent.length - 2);

  const iter = (currentValue, status = 'unchanged', depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }

    const delimiter = `\n${indent.repeat(depth)}`;

    if (status !== 'updated' && status !== 'complex') {
      const keys = Object.keys(currentValue);

      const lines = keys.map((key) => {
        const value = iter(currentValue[key], 'unchanged', depth + 1);

        return buildLine('unchanged', key, value, indentForValue);
      });

      return ['{', ...lines, '}'].join(delimiter);
    }

    const lines = currentValue.reduce((acc, { status: stat, key, value }) => {
      if (stat === 'updated') {
        const val1 = iter(value[0], 'unchanged', depth + 1);
        const val2 = iter(value[1], 'unchanged', depth + 1);

        acc.push(buildLine('removed', key, val1, indentForValue));
        acc.push(buildLine('added', key, val2, indentForValue));

        return acc;
      }

      const val = iter(value, stat, depth + 1);
      acc.push(buildLine(stat, key, val, indentForValue));

      return acc;
    }, []);

    return ['{', ...lines, '}'].join(delimiter);
  };

  return iter(data, 'updated', 0);
};
