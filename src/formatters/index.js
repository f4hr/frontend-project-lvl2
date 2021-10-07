import formatJson from './json.js';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatDiff = (data, format) => {
  switch (format) {
    case 'json':
      return formatJson(data);
    case 'plain':
      return formatPlain(data);
    case 'stylish':
      return formatStylish(data);
    default:
      throw new Error(`Unknown format "${format}"`);
  }
};

export default formatDiff;
