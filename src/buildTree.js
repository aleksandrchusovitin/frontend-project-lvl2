import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: value1 };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'hasChildren', children: buildTree(value1, value2) };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key, type: 'changed', oldValue: value1, newValue: value2,
      };
    }
    return { key, type: 'unchanged', value: value1 };
  });
};

export default buildTree;
