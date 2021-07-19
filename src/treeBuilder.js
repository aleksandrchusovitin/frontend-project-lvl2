import _ from 'lodash';

const treeBuilder = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, status: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'deleted', value: value1 };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'hasChildren', children: treeBuilder(value1, value2) };
    }

    if (value1 !== value2) {
      return {
        key, status: 'changed', oldValue: value1, newValue: value2,
      };
    }
    return { key, status: 'unchanged', value: value1 };
  });
};

export default treeBuilder;
