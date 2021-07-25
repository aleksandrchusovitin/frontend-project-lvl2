import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const determineFileFormat = (pathFile) => path.extname(pathFile).slice(1);

export default (path1, path2, formatName = 'stylish') => {
  const file1 = fs.readFileSync(path1);
  const file2 = fs.readFileSync(path2);
  const data1 = parse(file1, determineFileFormat(path1));
  const data2 = parse(file2, determineFileFormat(path2));

  const tree = buildTree(data1, data2);
  return format(tree, formatName);
};
