const stringify = (data) => {
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }

  return typeof data === 'string' ? `'${data}'` : data;
};

export default (tree) => {
  const iter = (currentValue, path) => {
    const lines = currentValue.map((node) => {
      const {
        key, status, value, oldValue, newValue, children,
      } = node;
      const newPath = [path, key].flat();
      switch (status) {
        case 'added':
          return `Property '${newPath.join('.')}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${newPath.join('.')}' was removed`;
        case 'changed':
          return `Property '${newPath.join('.')}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        case 'unchanged':
          return 'unchanged node';
        case 'hasChildren':
          return `${iter(children, newPath.join('.'))}`;
        default:
          throw new Error(`Wrong status ${status}`);
      }
    })
      .filter((line) => line !== 'unchanged node');
    return [...lines].join('\n');
  };
  return iter(tree, []);
};
