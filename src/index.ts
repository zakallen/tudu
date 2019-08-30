#!/usr/bin/env node

const { log, time, timeEnd } = console;

import chalk from 'chalk';
import { exec } from 'child_process';
import * as commander from 'commander';
import * as readline from 'readline';

import executionStr from './command';
import processOutput from './process';
import renderOutput from './render';
import init from './init';

commander
  .version('0.1.0')
  .description('Todo comments on steroids.')
  .option('-d, --debug', 'output extra debugging');

commander
  .command('init')
  .description('convert existing Todos into ~Todo')
  .action((): void => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = 
      `This will convert all existing TODOs into the ~Todo: syntax. Make\n` +
      `sure you're running this on a clean branch and are ready to commit\n` +
      `these changes. Proceed? [Yes/No] `;
    rl.question(question, (answer): void => {
      log();
      if (['Yes', 'yes', 'Y', 'y'].indexOf(answer) !== -1) {
        log(chalk.greenBright("🤘  Great! Let's begin..."));
        init(commander.debug);
      } else {
        log("🙁  Ok, maybe next time...");
      }
      rl.close();
    });
  });

commander.parse(process.argv);

if (commander.debug) {
  time('Completed in');
}

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

if (commander.debug) {
  timeEnd('Completed in');
}
