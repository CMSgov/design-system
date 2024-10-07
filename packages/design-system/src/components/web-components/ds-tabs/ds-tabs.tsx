import { define } from '../preactement/define';
import { Tabs, TabPanel } from '../../Tabs';
import { TabsProps } from '../../Tabs/Tabs';
import { findElementsOfType } from '../../utilities/findElementsOfType';
import { createElement } from 'react';

const attributes = [
  'children',
  'default-selected-id',
  'selected-id',
  'tablist-class-name',
  'tabs-aria-label',
];

interface WrapperProps extends Omit<TabsProps, 'children'> {
  children: TabsProps['children'];
  defaultSelectedId?: string;
  selectedId?: string;
  tablistClassName?: string;
  tabsAriaLabel?: string;
}

const Wrapper = ({ children = [], tabsAriaLabel, ...otherProps }: WrapperProps) => {
  function parseChildren(node) {
    const elements = findElementsOfType(['ds-tab-panel'], node);

    return elements.map((element) => {
      const { children, ...attrs } = element.props || {};
      return createElement(TabPanel, { ...attrs }, children);
    });
  }

  return (
    <Tabs {...otherProps} ariaLabel={tabsAriaLabel}>
      {parseChildren(children)}
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
