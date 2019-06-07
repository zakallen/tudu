#!/usr/bin/env node

const { table, getBorderCharacters } = require('table');
const chalk = require('chalk');
const { exec } = require('child_process');
const { performance } = require('perf_hooks');

const { log } = console;

// Tudu: be able to parse out other keywords
// Tudu: get linting in this project
// Tudu: add typescript to this project

const t0 = performance.now();

const ignoreDirArr = [
  'node_modules',
];

// Tudu: make file and directory ignore more robust
let ignoreDirStr = '';
if (ignoreDirArr.length > 0) {
  ignoreDirStr = `--exclude-dir=${ignoreDirArr[0]}`;
}

const ignoreFileStr = '';

const ignoreStr = `${ignoreDirStr} ${ignoreFileStr}`;

// Tudu: split up execution string builder even more
const keyword = String.raw`\(//\|#\) Tudu:`;
const executionStr = `grep -rnI "${keyword}" . ${ignoreStr}`;

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
