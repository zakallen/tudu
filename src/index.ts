#!/usr/bin/env node

const { log, time, timeEnd } = console;

import chalk from 'chalk';
import { exec } from 'child_process';
import * as commander from 'commander';

import executionStr from './command';
import processOutput from './process';
import renderOutput from './render';

time('Completed in');

commander
  .version('0.0.1')
  .description('Todo comments on steroids.')

commander.parse(process.argv);

exec(executionStr(), (error: any, stdout: string): void => {
  if (error) {
    log(chalk.red("🙅‍  No Tudu's found."));
    return;
  }

  const tableArr = processOutput(stdout);
  renderOutput(tableArr);

  timeEnd('Completed in');
});
