#!/usr/bin/env node

// todo: get linting in this project
// todo: add typescript to this project

const { log } = console;

const { table, getBorderCharacters } = require('table');
const chalk = require('chalk');
const { exec } = require('child_process');
const { performance } = require('perf_hooks');

const t0 = performance.now();

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

exec(executionStr, (error, stdout) => {
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
    drawHorizontalLine: () => false,
  });
  // empty line above table
  log('');
  log(output);

  const t1 = performance.now();
  log(`Completed in ${((t1 - t0) / 1000).toFixed(1)} seconds.`);
});
