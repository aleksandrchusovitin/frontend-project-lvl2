#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  });
program.parse(process.argv);
