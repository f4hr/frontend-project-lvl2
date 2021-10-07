import _ from 'lodash';

const getAst = (obj1, obj2) => {
  const combinedKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return combinedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return { key, type: 'added', value2 };
    }

    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value1 };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: getAst(value1, value2) };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'updated',
        value1,
        value2,
      };
    }

    return { key, type: 'unchanged', value1 };
  });
};

export default getAst;
