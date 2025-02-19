
// ensure `global` is available in browser mode
globalThis.global = globalThis;

// prevents `process.env` errors
globalThis.process = {
  env: {},
} as any;

globalThis.Buffer = globalThis.Buffer || {};
