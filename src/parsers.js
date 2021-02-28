import yaml from 'js-yaml';

const objToArrOfObj = (object) => Object.entries(object).map(([key, value]) => ({ key, value }));

const parseJson = (fileContent) => objToArrOfObj(JSON.parse(fileContent));

const parseYaml = (fileContent) => objToArrOfObj(yaml.load(fileContent) ?? {});

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
