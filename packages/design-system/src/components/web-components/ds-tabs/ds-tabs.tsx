import { define } from '../preactement/define';
import { Tabs, TabPanel } from '../../Tabs';
import { findElementsOfType } from '../../utilities/findElementsOfType';
import { createElement } from 'react';

const attributes = ['default-selected-id', 'selected-id', 'tablist-class-name', 'tabs-aria-label'];

const Wrapper = ({ tabsAriaLabel, ...props }) => {
  function parseChildren(node) {
    const elements = findElementsOfType(['ds-tab-panel'], node);

    return elements.map((element) => {
      const { children, ...attrs } = element.props || {};
      return createElement(TabPanel, { ...attrs }, children);
    });
  }

  return (
    <Tabs {...props} ariaLabel={tabsAriaLabel}>
      {parseChildren(props.children)}
    </Tabs>
  );
};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-tabs': JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-tabs', () => Wrapper, {
  attributes,
  events: [
    [
      'onChange',
      (selectedId: string, prevSelectedId: string) => ({
        detail: { selectedId, prevSelectedId },
      }),
    ],
  ],
} as any);
