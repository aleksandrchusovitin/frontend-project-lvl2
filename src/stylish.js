const stylish = (diff, obj1, obj2) => {
  const lines = Object
    .entries(diff)
    .flatMap(([key, value]) => {
      if (value === 'added') {
        return `  + ${key}: ${obj2[key]}`;
      }
      if (value === 'deleted') {
        return `  - ${key}: ${obj1[key]}`;
      }
      if (value === 'changed') {
        return [`  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
      }
      return `    ${key}: ${obj1[key]}`;
    });
  return [
    '{',
    ...lines,
    '}',
  ].join('\n');
};

export default stylish;
