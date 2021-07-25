import _ from 'lodash';

const stringify = (data) => {
  if (_.isPlainObject(data)) {
    return '[complex value]';
  }

  return typeof data === 'string' ? `'${data}'` : data;
};

export default (tree) => {
  const iter = (currentValue, path) => currentValue
    .filter(({ type }) => type !== 'unchanged')
    .map(({
      key, type, value, oldValue, newValue, children,
    }) => {
      const keys = [...path, key];
      const propertyName = keys.join('.');
      switch (type) {
        case 'added':
          return `Property '${propertyName}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${propertyName}' was removed`;
        case 'changed':
          return `Property '${propertyName}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        case 'hasChildren':
          return `${iter(children, keys)}`;
        default:
          throw new Error(`Wrong type ${type}`);
      }
    }).join('\n');
  return iter(tree, []);
};
