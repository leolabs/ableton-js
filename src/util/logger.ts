export interface Logger {
  debug: (msg: string, ...args: any[]) => unknown;
  info: (msg: string, ...args: any[]) => unknown;
  warn: (msg: string, ...args: any[]) => unknown;
  error: (msg: string, ...args: any[]) => unknown;
}
