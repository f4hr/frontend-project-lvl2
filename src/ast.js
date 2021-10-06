import _ from 'lodash';

const getAst = (obj1, obj2) => {
  const combinedKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)), (obj) => obj);

  return combinedKeys.map((key) => {
    const oldVal = obj1[key];
    const newVal = obj2[key];

    if (!_.has(obj1, key)) {
      return { key, type: 'added', newValue: newVal };
    }

    if (!_.has(obj2, key)) {
      return { key, type: 'removed', oldValue: oldVal };
    }

    if (_.isPlainObject(oldVal) && _.isPlainObject(newVal)) {
      return { key, type: 'nested', children: getAst(oldVal, newVal) };
    }

    if (oldVal !== newVal) {
      return {
        key,
        type: 'updated',
        oldValue: oldVal,
        newValue: newVal,
      };
    }

    return { key, type: 'unchanged', oldValue: oldVal };
  });
};

export default getAst;
