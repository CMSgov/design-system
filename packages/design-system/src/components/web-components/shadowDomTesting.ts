import { render } from '@testing-library/react';

export function createTestRenderer<T extends unknown[]>(
  customElementSelector: string,
  renderFn: (...args: T) => React.ReactElement
) {
  return (...args: T) => {
    const result = render(renderFn(...args));

    function createRerenderFunction(renderResult) {
      return (...newArgs: T) => {
        const rerenderResult = renderResult.rerender(renderFn(...newArgs));
        return {
          ...rerenderResult,
          shadowRoot: getShadowRoot(result),
          rerenderTest: createRerenderFunction(rerenderResult),
        };
      };
    }

    function getShadowRoot(renderResult): ShadowRoot {
      return renderResult.container.querySelector(customElementSelector).shadowRoot;
    }

    return {
      ...result,
      rerenderTest: createRerenderFunction(result),
      shadowRoot: getShadowRoot(result),
    };
  };
}
