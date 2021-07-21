const getIndent = (n) => ' '.repeat(n);

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return `${getIndent(depth + 8)}${key}: ${stringify(value, depth + 4)}`;
      }
      return `${getIndent(depth + 8)}${key}: ${value}`;
    });

  return [
    '{',
    ...lines,
    `${getIndent(depth + 4)}}`,
  ].join('\n');
};

export default (tree) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((node) => {
      const {
        key, status, value, oldValue, newValue, children,
      } = node;
      switch (status) {
        case 'added':
          return `${getIndent(depth + 2)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${getIndent(depth + 2)}- ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${getIndent(depth + 2)}- ${key}: ${stringify(oldValue, depth)}\n${getIndent(depth + 2)}+ ${key}: ${stringify(newValue, depth)}`;
        case 'unchanged':
          return `${getIndent(depth + 2)}  ${key}: ${stringify(value, depth)}`;
        case 'hasChildren':
          return `${getIndent(depth + 2)}  ${key}: ${iter(children, depth + 4)}`;
        default:
          throw new Error(`Wrong status ${status}`);
      }
    });
    return [
      '{',
      ...lines,
      `${getIndent(depth)}}`,
    ].join('\n');
  };
  return iter(tree, 0);
};
