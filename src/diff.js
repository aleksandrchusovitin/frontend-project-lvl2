import _ from 'lodash';
import normalizeFile from './parsers.js';

export default (filepath1, filepath2) => {
  const normalizeFile1 = normalizeFile(filepath1);
  const normalizeFile2 = normalizeFile(filepath2);

  const keys1 = _.keys(normalizeFile1);
  const keys2 = _.keys(normalizeFile2);
  const keys = _.union(keys1, keys2).sort();

  const result = keys.map((key) => {
    if (!_.has(normalizeFile1, key)) {
      return `  + ${key}: ${normalizeFile2[key]}`;
    }
    if (!_.has(normalizeFile2, key)) {
      return `  - ${key}: ${normalizeFile1[key]}`;
    }
    if (normalizeFile1[key] !== normalizeFile2[key]) {
      return `  - ${key}: ${normalizeFile1[key]}\n  + ${key}: ${normalizeFile2[key]}`;
    }
    return `    ${key}: ${normalizeFile2[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};
