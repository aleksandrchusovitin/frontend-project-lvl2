import * as fs from 'fs';
import yaml from 'js-yaml';
import * as path from 'path';

export default (filePath) => {
  const extensionFile = path.extname(filePath);
  const file = fs.readFileSync(filePath, 'utf-8');

  switch (extensionFile) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error(`Invalid file extension: '${filePath}'`);
  }
};
