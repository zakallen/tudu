const { log } = console;
import chalk from 'chalk';

export default function(stdout: string): string[][] {
  const rawArr = stdout.split('\n');
  const tableArr = [
    ['', 'Type', 'Title', 'File', 'Line'],
  ];
  // start at 1 for the list number
  for (let x = 1; x < rawArr.length; x += 1) {
    const line = rawArr[x - 1];
    if ((line.match(/\:/g) || []).length < 3) {
      log(chalk.red(`Error with line: ${line}`));
      return [['']];
    }
    const [
      path,
      lineNumber,
      commentStart,
      title,
    ] = line.split(':');

    const strippedKeyword = commentStart.replace(/.*(\/\/|\#|\<\!\-\-|\/\*) ~Todo/g, '~Todo');
    const fileName = path.replace(/.*\//g, '');
    tableArr.push([
      chalk.grey(`${x}.`),
      chalk.green(strippedKeyword),
      chalk.white(title.trim().replace(/\*\/\}/g, '')),
      chalk.blue(fileName),
      chalk.blue(lineNumber),
    ]);
  }
  return tableArr;
}
