// `ev-emitter` publishes no type declarations of its own. This shim covers the
// prototype methods defined in `ev-emitter/ev-emitter.js`; keep it in sync if the
// dependency is upgraded.

declare module 'ev-emitter' {
  type EvEmitterListener = (...args: any[]) => void;

  class EvEmitter {
    on(eventName: string, listener: EvEmitterListener): this;
    once(eventName: string, listener: EvEmitterListener): this;
    off(eventName: string, listener: EvEmitterListener): this;
    emitEvent(eventName: string, args?: any[]): this;
    allOff(): this;
  }

  export default EvEmitter;
}
