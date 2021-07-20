import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './format.js';

export default (path1, path2, formatName = 'stylish') => {
  const formatFile1 = path.extname(path1);
  const formatFile2 = path.extname(path2);

  const file1 = fs.readFileSync(path1);
  const file2 = fs.readFileSync(path2);
  const data1 = parse(file1, formatFile1);
  const data2 = parse(file2, formatFile2);

  const tree = buildTree(data1, data2);
  return format(tree, formatName);
};
