import type * as React from 'react';
import { define } from '../preactement/define';
import { Tabs, TabPanel } from '../../Tabs';
import { TabsProps } from '../../Tabs/Tabs';
import { TabPanelProps } from '../../Tabs/TabPanel';
import { parseBooleanAttr, parseJsonAttr } from '../wrapperUtils';
import { createElement } from 'react';

const attributes = ['default-selected-id', 'selected-id', 'tablist-class-name', 'tabs-aria-label'];

/**
 * A `ds-tab-panel` child as it arrives from the custom element, whose attributes
 * are still kebab-cased strings rather than `TabPanelProps`.
 */
type TabPanelElement = React.ReactElement<Record<string, any>>;

function parseChildren(nodes?: TabPanelElement[]) {
  if (!nodes) return null;

  return nodes.map((element) => {
    if (!element || !element.props) return null;

    const attrs = element.props;

    if (!attrs.id || !attrs.children || !attrs.tab) {
      console.warn(
        'Each child passed to `ds-tabs` must include `id` and `children` attributes for `TabPanel` functionality.'
      );
      return null;
    }

    const {
      id,
      children,
      'class-name': className,
      selected: selected,
      disabled: disabled,
      tab: tab,
      'tab-class-name': tabClassName,
      'tab-href': tabHref,
      'tab-id': tabId,
      ...otherAttributes
    } = attrs;

    const props: Partial<TabPanelProps> = {
      id,
      className,
      selected: parseBooleanAttr(selected),
      disabled: parseBooleanAttr(disabled),
      tab: parseJsonAttr(tab),
      tabClassName,
      tabHref,
      tabId,
    };

    // `TabPanelProps` requires `children`, which is supplied positionally below.
    return createElement(TabPanel, { ...props, ...otherAttributes } as TabPanelProps, children);
  });
}

interface WrapperProps extends Omit<TabsProps, 'ariaLabel' | 'children'> {
  tabsAriaLabel?: string;
  children?: TabPanelElement[];
}

const Wrapper = ({ tabsAriaLabel, ...props }: WrapperProps) => {
  return (
    <Tabs {...props} ariaLabel={tabsAriaLabel}>
      {parseChildren(props.children)}
    </Tabs>
  );
};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-tabs': React.JSX.IntrinsicElements['div'] & {
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
