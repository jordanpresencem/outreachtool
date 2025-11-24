declare const process: {
  env: Record<string, string | undefined>;
  exitCode?: number;
};

declare const __dirname: string;

declare module 'fs/promises' {
  export function readFile(path: string, options?: any): Promise<string>;
}

declare module 'path' {
  export function resolve(...paths: string[]): string;
  const _default: { resolve: typeof resolve };
  export default _default;
}
