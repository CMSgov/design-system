export function debounce<Params extends any[]>(fn: (...args: Params) => any, ms: number) {
  let timer: NodeJS.Timeout | undefined;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      // The arrow functions here close over `debounce`'s `this`, which is always
      // `undefined` in strict-mode module code, so there is no caller `this` to forward.
      fn(...(args as Params));
    }, ms);
  };
}

export default debounce;
