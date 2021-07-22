const makeIndent = (n) => ' '.repeat(n);

const indentSize = 2;

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return `${makeIndent(depth + indentSize * 4)}${key}: ${stringify(value, depth + indentSize * 2)}`;
      }
      return `${makeIndent(depth + indentSize * 4)}${key}: ${value}`;
    });

  return [
    '{',
    ...lines,
    `${makeIndent(depth + indentSize * 2)}}`,
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
          return `${makeIndent(depth + indentSize)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${makeIndent(depth + indentSize)}- ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${makeIndent(depth + indentSize)}- ${key}: ${stringify(oldValue, depth)}\n${makeIndent(depth + indentSize)}+ ${key}: ${stringify(newValue, depth)}`;
        case 'unchanged':
          return `${makeIndent(depth + indentSize)}  ${key}: ${stringify(value, depth)}`;
        case 'hasChildren':
          return `${makeIndent(depth + indentSize)}  ${key}: ${iter(children, depth + indentSize * 2)}`;
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
