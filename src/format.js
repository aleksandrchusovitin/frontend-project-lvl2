import formatStylish from './formatters/formatStylish.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(tree);
    default:
      throw new Error(`Wrong format ${format}`);
  }
};
