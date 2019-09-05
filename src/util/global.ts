let debug = false;

export function isDebug(): boolean {
  return debug;
}

export function setDebug(value: boolean): void {
  debug = value;
}
