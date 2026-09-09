import { render, RenderResult } from '@testing-library/react';
import userEvent, { Options } from '@testing-library/user-event';

export function createGenericTestRenderer<T extends unknown[]>(
  customElementSelector: string,
  renderFn: (...args: T) => React.ReactElement<any>,
  userEventSetupOptions: Options = {}
) {
  return (...args: T) => {
    const result = render(renderFn(...args));

    function getCustomElement(renderResult: RenderResult) {
      return renderResult.container.querySelector(customElementSelector);
    }

    function getShadowRoot(renderResult: RenderResult): ShadowRoot {
      return getCustomElement(renderResult).shadowRoot;
    }

    function createRerenderFunction(renderResult: RenderResult) {
      return (...newArgs: T) => {
        renderResult.rerender(renderFn(...newArgs));
        return {
          customElement: getCustomElement(result),
          shadowRoot: getShadowRoot(result),
          rerenderTest: createRerenderFunction(renderResult),
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
  ) => React.ReactElement<any>,
  userEventSetupOptions: Options = {}
) {
  return createGenericTestRenderer(tagName, renderFn, userEventSetupOptions);
}
