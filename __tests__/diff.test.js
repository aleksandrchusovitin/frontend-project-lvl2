import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');

const yamlFile1 = getFixturePath('file1.yml');
const yamlFile2 = getFixturePath('file2.yml');

const correctLineFixturePath = getFixturePath('differences.txt');
const correctLine = fs.readFileSync(correctLineFixturePath, 'utf-8');

test('gendiff test', () => {
  expect(genDiff(jsonFile1, jsonFile2)).toBe(correctLine);
  expect(genDiff(yamlFile1, yamlFile2)).toBe(correctLine);
});
