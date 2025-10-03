import { render } from '@testing-library/react';
import userEvent, { Options } from '@testing-library/user-event';

export function createGenericTestRenderer<T extends unknown[]>(
  customElementSelector: string,
  renderFn: (...args: T) => React.ReactElement,
  userEventSetupOptions: Options = {}
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
      user: userEvent.setup(userEventSetupOptions),
    };
  };
}

/**
 * This is a convenient version that assumes that the render function will always have
 * attribute and children parameters and can automatically add the type annotations.
 */
export function createTestRenderer<TagName extends keyof React.JSX.IntrinsicElements>(
  tagName: TagName,
  renderFn: (
    attrs?: React.JSX.IntrinsicElements[TagName],
    children?: React.ReactNode
  ) => React.ReactElement,
  userEventSetupOptions: Options = {}
) {
  return createGenericTestRenderer(tagName, renderFn, userEventSetupOptions);
}
