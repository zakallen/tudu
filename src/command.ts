const { log } = console;

export default function(): string {
  // ~Todo: export the comment delimiter
  const commentStr = String.raw`\(//\|#\|<!--\) ~Todo`;
  const executionStr = String.raw`git grep -n --untracked "${commentStr}"`;

  // for debugging
  // log(executionStr);
  return executionStr;
}
