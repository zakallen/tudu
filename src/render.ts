const { log } = console;
import { table, getBorderCharacters } from 'table';

export default function(tableArr: string[][]): void {
  const output = table(tableArr, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 1,
      paddingRight: 0,
    },
    columns: {
      2: {
        width: 50,
        wordWrap: true,
      },
    },
    drawHorizontalLine: (): boolean => false,
  });

  // empty line above table
  log('');
  log(output);
}
