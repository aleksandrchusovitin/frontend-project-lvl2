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
      const newPath = [...path, key].join('.');
      switch (type) {
        case 'added':
          return `Property '${newPath}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${newPath}' was removed`;
        case 'changed':
          return `Property '${newPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        case 'hasChildren':
          return `${iter(children, [...path, key])}`;
        default:
          throw new Error(`Wrong type ${type}`);
      }
    }).join('\n');
  return iter(tree, []);
};
