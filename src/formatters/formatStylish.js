const makeIndent = (n) => ' '.repeat(n);

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return `${makeIndent(depth + 8)}${key}: ${stringify(value, depth + 4)}`;
      }
      return `${makeIndent(depth + 8)}${key}: ${value}`;
    });

  return [
    '{',
    ...lines,
    `${makeIndent(depth + 4)}}`,
  ].join('\n');
};

export default (tree) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((node) => {
      const {
        key, type, value, oldValue, newValue, children,
      } = node;
      switch (type) {
        case 'added':
          return `${makeIndent(depth + 2)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${makeIndent(depth + 2)}- ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${makeIndent(depth + 2)}- ${key}: ${stringify(oldValue, depth)}\n${makeIndent(depth + 2)}+ ${key}: ${stringify(newValue, depth)}`;
        case 'unchanged':
          return `${makeIndent(depth + 2)}  ${key}: ${stringify(value, depth)}`;
        case 'hasChildren':
          return `${makeIndent(depth + 2)}  ${key}: ${iter(children, depth + 4)}`;
        default:
          throw new Error(`Wrong type ${type}`);
      }
    });
    return [
      '{',
      ...lines,
      `${makeIndent(depth)}}`,
    ].join('\n');
  };
  return iter(tree, 0);
};
