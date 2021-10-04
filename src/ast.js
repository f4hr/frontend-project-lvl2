import _ from 'lodash';

const getAst = (obj1, obj2) => {
  const combinedKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)), (obj) => obj);

  return combinedKeys.map((key) => {
    const oldVal = obj1[key];
    const newVal = obj2[key];

    if (!_.has(obj1, key)) {
      return { key, status: 'added', value: newVal };
    }

    if (!_.has(obj2, key)) {
      return { key, status: 'removed', value: oldVal };
    }

    if (_.isPlainObject(oldVal) && _.isPlainObject(newVal)) {
      return { key, status: 'nested', value: getAst(oldVal, newVal) };
    }

    if (oldVal !== newVal) {
      return { key, status: 'updated', value: [oldVal, newVal] };
    }

    return { key, status: 'unchanged', value: oldVal };
  });
};

export default getAst;
