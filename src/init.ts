const { log } = console;
import { exec } from 'child_process';

export default function(debug: boolean): void {
  const delimiterArr = [
    '//',
    '#',
  ];

  const grepCommand = String.raw`git grep -l --untracked`;

  // ~Todo: Grep and Substitution same command
  // - right now the grep and sed commands are different
  // - grep i dont have to escape the / char whereas with sed i do

  // ~Todo: Better TODO regex
  // - just searching for capital TODO, that needs to handle
  // - colons, spaces, and be case insenitive

  for (const delimiter of delimiterArr) {
    const gitStr = String.raw`${delimiter} TODO`;
    const sedStr = String.raw`\/\/ TODO`;
    const newText = String.raw`\/\/ ~Todo:`;
    const replace = String.raw`xargs sed -i '' -e 's/${sedStr}/${newText}/g'`;
    const executionStr = String.raw`${grepCommand} "${gitStr}" | ${replace}`;
    // for debugging
    if (debug) {
      log(executionStr);
    }
    exec(executionStr, (): void => {});
  }
}
