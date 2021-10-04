import yaml from 'js-yaml';

const parseData = (fileContent, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yaml':
    case 'yml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Unknown format "${format}"`);
  }
};

export default parseData;
