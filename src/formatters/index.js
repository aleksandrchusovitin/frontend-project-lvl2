import formatStylish from './formatStylish.js';
import formatPlain from './formatPlain.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return formatPlain(tree);
    default:
      throw new Error(`Wrong format ${format}`);
  }
};
