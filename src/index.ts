#!/usr/bin/env node

const { log, time, timeEnd } = console;

import chalk from 'chalk';
import { exec } from 'child_process';

import executionStr from './command';
import processOutput from './process';
import renderOutput from './render';

import program from 'commander';
program
  .version('0.0.1')
  .description('An application for pizzas ordering')

time('Completed in');

var argv = require('yargs') // eslint-disable-line
  .usage('Usage: $0 <command> [options]')
  .command('todo', 'List out only todos')
  .command('feature', 'List out only features')
  .command('refactor', 'List out only refactors')
  .command('bugfix', 'List out only bugfixes')
  .help('h')
  .argv;

exec(executionStr(), (error: any, stdout: string): void => {
  if (error) {
    log(chalk.red("🙅‍  No Tudu's found."));
    return;
  }

  const tableArr = processOutput(stdout);
  renderOutput(tableArr);

  timeEnd('Completed in');
});
