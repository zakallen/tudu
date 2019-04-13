#!/usr/bin/env node

const chalk = require('chalk');
const log = console.log;

// tudu: recursively go through all files in a tree
// tudu: output tudus as they are hit within files
// tudu: print them out using chalk in a nice way

log(chalk.blue('Hello') + ' World' + chalk.green('!'));
