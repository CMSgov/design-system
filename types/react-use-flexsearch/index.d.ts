// `react-use-flexsearch` publishes no type declarations of its own. This shim
// covers `useFlexSearch`, the only export the docs site uses.

declare module 'react-use-flexsearch' {
  /**
   * Searches a serialized FlexSearch index and maps each hit id back through
   * `store`. The index carries no type information about what it indexed, so
   * the result type is inferred from `store` rather than known here.
   */
  export function useFlexSearch<TResult = any>(
    query: string,
    index: string | object,
    store: Record<string, TResult> | Array<Record<string, TResult>>,
    searchOptions?: Record<string, unknown>
  ): TResult[];
}
