import { define } from '../preactement/define';
import { Tabs, TabPanel } from '../../Tabs';
import { TabPanelProps } from '../../Tabs/TabPanel';
import { findElementsOfType } from '../../utilities/findElementsOfType';
import { createElement } from 'react';

/**
 * Parses custom web components that are `ds-tab-panel` elements and converts them into React components.
 * This is necessary for the `Tabs` interface, which expects `TabPanel` children to be React components.
 * The function handles `ds-tab-panel` elements by converting their kebab-cased attributes into camelCased React props.
 */
function parseChildren(node) {
  const elements = findElementsOfType(['ds-tab-panel'], node);

  const mappedElements = elements.map((element) => {
    const { children, ...attrs } = element.props || {};

    // Rename `root-id` to `id` if it exists.
    if ('root-id' in attrs) {
      attrs.id = attrs['root-id'];
      delete attrs['root-id'];
    }

    /**
     * Convert kebab-cased attributes to camelCased props.
     * E.g., `tab-class-name` becomes `tabClassName`.
     */
    const camelCaseAttrs = Object.keys(attrs).reduce((acc, key) => {
      const camelCaseKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[camelCaseKey] = attrs[key];
      return acc;
    }, {} as Partial<TabPanelProps>);

    const reactElem = createElement(TabPanel, camelCaseAttrs as TabPanelProps, children);

    return reactElem;
  });

  return mappedElements;
}

const attributes = ['default-selected-id', 'selected-id', 'tablist-class-name', 'tabs-aria-label'];

const Wrapper = ({ tabsAriaLabel, ...props }) => {
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
