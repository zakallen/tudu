const { log } = console;
import { exec } from 'child_process';
import chalk from 'chalk';

export default function(debug: boolean): void {
  const delimiterArr = [
    String.raw`\/\/`,
    String.raw`\#`,
  ];

  const grepCommand = String.raw`git grep --untracked -E`;
  const grepFilesFlag = String.raw`-l`;
  const promiseArr = [];

  // ~Todo: Test this file
  // - I need a way to run tests to test this init file to make
  // - sure that it covers all the random permutations of todos

  for (const delimiter of delimiterArr) {
    const regex = String.raw`${delimiter} *[@~-]?[Tt][Oo][Dd][Oo]:? ?`;
    const newText = String.raw`\/\/ ~Todo: `;
    const replace = String.raw`xargs sed -i '' -E 's/${regex}/${newText}/g'`;
    const executionStr = String.raw`${grepCommand} ${grepFilesFlag} "${regex}" | ${replace}`;

    if (debug) {
      log(executionStr);
    }
    promiseArr.push(
      new Promise((resolve: Function): void => {
        exec(executionStr, (): void => {
          resolve();
        });
      })
    );

    promiseArr.push(
      new Promise((resolve: Function): void => {
        exec(String.raw`${grepCommand} "${regex}" | wc -l`, (error: any, stdout: string): void => {
          resolve(parseInt(stdout));
        });
      })
    );
  }
  Promise.all(promiseArr).then((results): void => {
    const filteredArr = results.filter((el): boolean => { return el != undefined; });
    const count = filteredArr.reduce((a: number, b: any): number => a + b, 0);
    log(chalk.greenBright(`👍  Replaced ${count} Todo${count !== 1 ? 's' : ''}.`));
  });
}
