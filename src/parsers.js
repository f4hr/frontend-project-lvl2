import yaml from 'js-yaml';

const parseJson = (fileContent) => JSON.parse(fileContent);

const parseYaml = (fileContent) => yaml.load(fileContent) ?? {};

const parseData = (fileContent, ext) => {
  switch (ext) {
    case '.yaml':
    case '.yml':
      return parseYaml(fileContent);
    default:
      return parseJson(fileContent);
  }
};

export default parseData;
