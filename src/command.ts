const { log } = console;

import { isDebug } from './util/global';

export default function(): string {
  const delimiterArr = [
    String.raw`\/\/`,
    String.raw`\#`,
    String.raw`\/\*`,
  ];
  const delimiters = delimiterArr.join('|');
  const commentStr = String.raw`(${delimiters}) ~Todo:`;
  const executionStr = String.raw`git grep -n --untracked -E "${commentStr}"`;

  if (isDebug()) {
    log(executionStr);
  }
  return executionStr;
}
