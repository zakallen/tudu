#!/usr/bin/env node

const chalk = require('chalk');
const { exec } = require('child_process');
const log = console.log;

// tudu: print them out using chalk in a nice way
// tudu: test2

exec("grep -rnI '\(//\|#\) tudu:' .", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  const arr = stdout.split('\n');
  for (let x = 1; x < arr.length - 1; x++) {
    log(`${x}. ${chalk.blue(arr[x])}`);
  }
});
