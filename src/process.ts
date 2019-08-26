import chalk from 'chalk';

export default function(stdout: string): string[][] {
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
    const strippedKeyword = commentStart.replace(/ *(\/\/|#|<!--) /g, '');
    tableArr.push([
      `${x}.`,
      strippedKeyword,
      chalk.blue(title.trim()),
      path,
      lineNumber,
    ]);
  }
  return tableArr;
}
