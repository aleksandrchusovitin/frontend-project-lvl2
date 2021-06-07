import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  let result = '{\n';
  try {
    const filePath1 = path.resolve(filepath1);
    const filePath2 = path.resolve(filepath2);

    const file1 = fs.readFileSync(filePath1);
    const file2 = fs.readFileSync(filePath2);

    const normalizeJsonFile1 = JSON.parse(file1);
    const normalizeJsonFile2 = JSON.parse(file2);

    const keys1 = _.keys(normalizeJsonFile1);
    const keys2 = _.keys(normalizeJsonFile2);
    const keys = _.union(keys1, keys2);

    keys.forEach((key) => {
      if (!_.has(normalizeJsonFile1, key)) {
        result = `${result}  + ${key}: ${normalizeJsonFile2[key]}\n`;
      } else if (!_.has(normalizeJsonFile2, key)) {
        result = `${result}  - ${key}: ${normalizeJsonFile1[key]}\n`;
      } else if (normalizeJsonFile1[key] !== normalizeJsonFile2[key]) {
        result = `${result}  - ${key}: ${normalizeJsonFile1[key]}\n`;
        result = `${result}  + ${key}: ${normalizeJsonFile2[key]}\n`;
      } else {
        result = `${result}    ${key}: ${normalizeJsonFile2[key]}\n`;
      }
    });
  } catch (err) {
    console.error(err);
  }
  return `${result}}`;
};
