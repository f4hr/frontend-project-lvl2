const plainStatusValues = {
  pre: 'Property',
  removed: 'was removed',
  added: 'was added with value:',
  unchanged: 'was not changed',
  complex: '[complex value]',
  updated: 'was updated.',
};

export default (data) => {
  const iter = (currentValue, status = 'unchanged', propPath = []) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return (typeof currentValue === 'string') ? `'${currentValue}'` : `${currentValue}`;
    }

    let lines;

    if (status === 'updated' || status === 'complex') {
      lines = currentValue.reduce((acc, { status: stat, key, value }) => {
        const path = [...propPath];
        path.push(key);
        if (stat === 'updated') {
          const val1 = iter(value[0], 'unchanged', propPath);
          const val2 = iter(value[1], 'unchanged', propPath);

          acc.push(`${plainStatusValues.pre} '${path.join('.')}' ${plainStatusValues.updated} From ${val1} to ${val2}`);

          return acc;
        }

        const val = iter(value, stat, [...propPath, key]);
        switch (stat) {
          case 'added':
            acc.push(`${plainStatusValues.pre} '${path.join('.')}' ${plainStatusValues.added} ${val}`);
            break;
          case 'removed':
            acc.push(`${plainStatusValues.pre} '${path.join('.')}' ${plainStatusValues.removed}`);
            break;
          case 'complex':
            acc.push(`${val}`);
            break;
          default:
            break;
        }

        return acc;
      }, []);
    } else {
      return `${plainStatusValues.complex}`;
    }
    const delimiter = '\n';

    return lines.join(delimiter);
  };

  return iter(data, 'updated');
};
