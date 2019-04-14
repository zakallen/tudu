#!/usr/bin/env node

const chalk = require('chalk');
const { exec } = require('child_process');
const log = console.log;

// tudu: print them out using chalk in a nice way

exec("grep -rnIF 'tudu:' .", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  log(`stdout: ${stdout}`);
  log(`stderr: ${stderr}`);
});

log(chalk.blue('Hello') + ' World' + chalk.green('!'));
