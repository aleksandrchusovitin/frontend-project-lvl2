import parse from './parsers.js';
import treeBuilder from './treeBuilder.js';
import stylish from './stylish.js';

export default (path1, path2) => {
  const data1 = parse(path1);
  const data2 = parse(path2);

  const tree = treeBuilder(data1, data2);
  return stylish(tree);
};
