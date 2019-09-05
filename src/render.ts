const { log } = console;
import { table, getBorderCharacters } from 'table';
import { spawn } from 'child_process';

import { isDebug } from './util/global';

export default function(tableArr: string[][]): void {
  const output = table(tableArr, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 1,
      paddingRight: 0,
    },
    columns: {
      2: {
        width: 40,
        // @ts-ignore: doesn't look like wrapWord is in the table types
        wrapWord: true,
      },
      3: {
        width: 20,
        truncate: 25,
      },
    },
    drawHorizontalLine: (): boolean => false,
  })
    .replace(/\$/g, String.raw`\$`)
    .replace(/\`/g, String.raw`\``);

  let addLess = '';
  if (output.split(/\r\n|\r|\n/).length > 30) {
    addLess = String.raw` | less`;
  }

  const command = `cat <<< "${output}"${addLess}`;

  if (isDebug()) {
    log(command);
  }

  spawn(command, {
    stdio: 'inherit',
    shell: true
  });
}
