import { render } from '@testing-library/react';

export function createGenericTestRenderer<T extends unknown[]>(
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

/**
 * This is a convenient version that assumes that the render function will always have
 * attribute and children parameters and can automatically add the type annotations.
 */
export function createTestRenderer<TagName extends keyof JSX.IntrinsicElements>(
  tagName: TagName,
  renderFn: (
    attrs: JSX.IntrinsicElements[TagName],
    children: React.ReactElement
  ) => React.ReactElement
) {
  return createGenericTestRenderer(tagName, renderFn);
}
