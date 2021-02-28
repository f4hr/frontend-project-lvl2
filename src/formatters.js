const formatStylish = (entries) => {
  const lines = [];

  lines.push('{');
  entries.forEach(({ key, value, status }) => {
    const tab = '  ';

    switch (status) {
      case 'deleted':
        lines.push(`${tab}- ${key}: ${value}`);
        break;
      case 'added':
        lines.push(`${tab}+ ${key}: ${value}`);
        break;
      case 'updated':
        lines.push(`${tab}- ${key}: ${value[0]}`);
        lines.push(`${tab}+ ${key}: ${value[1]}`);
        break;
      default:
        lines.push(`${tab}  ${key}: ${value}`);
    }
  });
  lines.push('}');

  return lines.join('\n');
};

const formatDiff = (entries, format) => {
  switch (format) {
    default:
      return formatStylish(entries);
  }
};

export default formatDiff;
