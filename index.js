#!/usr/bin/env node

// todo: get linting in this project
// todo: add typescript to this project

const { log } = console;

const { table, getBorderCharacters } = require('table');
const chalk = require('chalk');
const { exec } = require('child_process');
const { performance } = require('perf_hooks');

const t0 = performance.now();

// todo: get yargs working properly
var argv = require('yargs') // eslint-disable-line
  .usage('Usage: $0 <command> [options]')
  .command('todo', 'List out todos')
  .option('verbose', {
    alias: 'v',
    default: false,
  })
  .argv;

// feature: be able to parse out other keywords
let keyword = 'todo';
if (argv._.length === 1) {
  [keyword] = argv._;
}

// refactor: split up execution string builder even more
const executionStr = String.raw`git grep -n --untracked --full-name "\(//\|#\) ${keyword}:"`;

exec(executionStr, (error, stdout) => {
  if (error) {
    log(chalk.red("🙅‍  No Tudu's found."));
    return;
  }
  const arr = stdout.split('\n');
  const outputArr = [
    ['', 'Title', 'File', 'Line'],
  ];
  for (let x = 1; x < arr.length; x += 1) {
    const line = arr[x - 1]
    const [
      path,
      lineNumber,
      commentStart,
      title,
    ] = line.split(':');
    outputArr.push([
      `${x}.`,
      chalk.blue(title.trim()),
      path,
      lineNumber,
    ]);
  }
  const output = table(outputArr, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 1
    },
    drawHorizontalLine: () => {
      return false;
    },
  });
  // empty line above table
  log('');
  log(output);

  const t1 = performance.now();
  log(`Completed in ${((t1 - t0) / 1000).toFixed(1)} seconds.`);
});
