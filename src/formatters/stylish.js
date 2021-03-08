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

export default (data, options = stylishDefaultOptions) => {
  const currentOptions = { ...stylishDefaultOptions, ...options };
  const { replacer, spacesCount } = currentOptions;
  const indent = replacer.repeat(spacesCount);
  const indentForValue = indent.substring(0, indent.length - 2);

  const iter = (currentValue, status = 'unchanged', depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }

    let lines;

    if (status === 'updated' || status === 'complex') {
      lines = currentValue.reduce((acc, { status: stat, key, value }) => {
        if (stat === 'updated') {
          const val1 = iter(value[0], 'unchanged', depth + 1);
          const val2 = iter(value[1], 'unchanged', depth + 1);

          acc.push(`${indentForValue}${stylishStatusValues.removed}${key}: ${val1}`);
          acc.push(`${indentForValue}${stylishStatusValues.added}${key}: ${val2}`);

          return acc;
        }

        const val = iter(value, stat, depth + 1);
        acc.push(`${indentForValue}${stylishStatusValues[stat]}${key}: ${val}`);

        return acc;
      }, []);
    } else {
      const keys = Object.keys(currentValue);

      lines = keys.map((key) => {
        const value = iter(currentValue[key], 'unchanged', depth + 1);
        return `${indentForValue}${stylishStatusValues.unchanged}${key}: ${value}`;
      });
    }
    const delimiter = `\n${indent.repeat(depth)}`;

    return ['{', ...lines, '}'].join(delimiter);
  };

  return iter(data, 'updated', 0);
};
