const plainStatusValues = {
  pre: 'Property',
  removed: 'was removed',
  added: 'was added with value:',
  updated: 'was updated.',
  complex: '[complex value]',
};

const buildLine = (value, path, status) => {
  if (status === 'updated') {
    const [val1, val2] = value;
    return `${plainStatusValues.pre} '${path.join('.')}' ${plainStatusValues.updated} From ${val1} to ${val2}`;
  }
  if (status === 'added') {
    return `${plainStatusValues.pre} '${path.join('.')}' ${plainStatusValues.added} ${value}`;
  }
  if (status === 'removed') {
    return `${plainStatusValues.pre} '${path.join('.')}' ${plainStatusValues.removed}`;
  }

  return `${value}`;
};

export default (data) => {
  const iter = (currentValue, propPath = [], status = 'unchanged') => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return (typeof currentValue === 'string') ? `'${currentValue}'` : `${currentValue}`;
    }

    if (status !== 'updated' && status !== 'complex') {
      return `${plainStatusValues.complex}`;
    }
    const lines = currentValue.reduce((acc, { status: stat, key, value }) => {
      if (stat === 'unchanged') {
        return acc;
      }
      const path = [...propPath, key];
      const val = (stat === 'updated') ? [iter(value[0], propPath), iter(value[1], propPath)] : iter(value, path, stat);

      acc.push(buildLine(val, path, stat));

      return acc;
    }, []);

    return lines.join('\n');
  };

  return iter(data, [], 'updated');
};
