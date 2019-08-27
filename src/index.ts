#!/usr/bin/env node

const { log, time, timeEnd } = console;

import chalk from 'chalk';
import { exec } from 'child_process';
import * as commander from 'commander';

import executionStr from './command';
import processOutput from './process';
import renderOutput from './render';
import init from './init';

time('Completed in');

commander
  .version('0.0.1')
  .description('Todo comments on steroids.')
  .option('-d, --debug', 'output extra debugging');

commander
  .command('init')
  .description('convert existing Todos into ~Todo')
  .action((): void => {
    // ~Todo: User prompt for init
    // - I want the user to understand what's about to happen
    // - as well as not have staged files and be ready to put
    // - changes in a commit
    init(commander.debug);
  });

commander.parse(process.argv);

// Only run default tudu code if root command
if (commander.args.length <= 0) {
  exec(executionStr(commander.debug), (error: any, stdout: string): void => {
    if (error) {
      log(chalk.red("🙅‍  No Tudu's found."));
      return;
    }

    const tableArr = processOutput(stdout);
    renderOutput(tableArr);
  });
}

timeEnd('Completed in');
