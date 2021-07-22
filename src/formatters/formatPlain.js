const stringify = (data) => {
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }

  return typeof data === 'string' ? `'${data}'` : data;
};

export default (tree) => {
  const iter = (currentValue, path) => {
    const lines = currentValue
      .filter(({ type }) => type !== 'unchanged')
      .map((node) => {
        const {
          key, type, value, oldValue, newValue, children,
        } = node;
        const newPath = [path, key].flat();
        switch (type) {
          case 'added':
            return `Property '${newPath.join('.')}' was added with value: ${stringify(value)}`;
          case 'deleted':
            return `Property '${newPath.join('.')}' was removed`;
          case 'changed':
            return `Property '${newPath.join('.')}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
          case 'hasChildren':
            return `${iter(children, newPath.join('.'))}`;
          default:
            throw new Error(`Wrong type ${type}`);
        }
      });
    return [...lines].join('\n');
  };
  return iter(tree, []);
};
