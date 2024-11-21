import { render } from '@testing-library/react';

export function createGenericTestRenderer<T extends unknown[]>(
  customElementSelector: string,
  renderFn: (...args: T) => React.ReactElement
) {
  return (...args: T) => {
    const result = render(renderFn(...args));

    function getCustomElement(renderResult) {
      return renderResult.container.querySelector(customElementSelector);
    }

    function getShadowRoot(renderResult): ShadowRoot {
      return getCustomElement(renderResult).shadowRoot;
    }

    function createRerenderFunction(renderResult) {
      return (...newArgs: T) => {
        const rerenderResult = renderResult.rerender(renderFn(...newArgs));
        return {
          ...rerenderResult,
          customElement: getCustomElement(result),
          shadowRoot: getShadowRoot(result),
          rerenderTest: createRerenderFunction(rerenderResult),
        };
      };
    }

    return {
      ...result,
      customElement: getCustomElement(result),
      shadowRoot: getShadowRoot(result),
      rerenderTest: createRerenderFunction(result),
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
    attrs?: JSX.IntrinsicElements[TagName],
    children?: React.ReactElement
  ) => React.ReactElement
) {
  return createGenericTestRenderer(tagName, renderFn);
}
