#!/usr/bin/env node

const { log, time, timeEnd } = console;

import { table, getBorderCharacters } from 'table';
import chalk from 'chalk';
import { exec } from 'child_process';

time('Completed in');

var argv = require('yargs') // eslint-disable-line
  .usage('Usage: $0 <command> [options]')
  .command('todo', 'List out only todos')
  .command('feature', 'List out only features')
  .command('refactor', 'List out only refactors')
  .command('bugfix', 'List out only bugfixes')
  .help('h')
  .argv;

let keyword = String.raw`\(todo\|feature\|refactor\|bugfix\)`;
if (argv._.length === 1) {
  [keyword] = argv._;
}

const commentStr = String.raw`\(//\|#\)`;
const executionStr = String.raw`git grep -n --untracked --full-name "${commentStr} ${keyword}:"`;

// for debugging
log(executionStr);

exec(executionStr, (error: any, stdout: string): void => {
  if (error) {
    log(chalk.red("🙅‍  No Tudu's found."));
    return;
  }
  const rawArr = stdout.split('\n');
  const tableArr = [
    ['', 'Type', 'Title', 'File', 'Line'],
  ];
  for (let x = 1; x < rawArr.length; x += 1) {
    const line = rawArr[x - 1];
    const [
      path,
      lineNumber,
      commentStart,
      title,
    ] = line.split(':');
    const strippedKeyword = commentStart.replace(/ *(\/\/|#) /g, '');
    tableArr.push([
      `${x}.`,
      strippedKeyword,
      chalk.blue(title.trim()),
      path,
      lineNumber,
    ]);
  }

  const output = table(tableArr, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 1,
    },
    drawHorizontalLine: (): boolean => false,
  });

  // empty line above table
  log('');
  log(output);

  timeEnd('Completed in');
});
