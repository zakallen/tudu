const { log } = console;

export default function(debug: boolean): string {
  const delimiterArr = [
    '//',
    '#',
    '<!--',
  ];
  const delimiters = delimiterArr.join(String.raw`\|`);
  const commentStr = String.raw`\(${delimiters}\) ~Todo`;
  const executionStr = String.raw`git grep -n --untracked "${commentStr}"`;

  if (debug) {
    log(executionStr);
  }
  return executionStr;
}
