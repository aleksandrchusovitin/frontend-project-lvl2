#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    const diff = genDiff(filepath1, filepath2, format);
    console.log(diff);
  });
program.parse(process.argv);
