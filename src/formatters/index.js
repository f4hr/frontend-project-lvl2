import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatDiff = (entries, formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain(entries);
    default:
      return formatStylish(entries);
  }
};

export default formatDiff;
