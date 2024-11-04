import { define } from '../preactement/define';
import { Tabs, TabPanel } from '../../Tabs';
import { TabPanelProps } from '../../Tabs/TabPanel';
import { parseBooleanAttr, parseJsonAttr } from '../wrapperUtils';
import { createElement } from 'react';

const attributes = ['default-selected-id', 'selected-id', 'tablist-class-name', 'tabs-aria-label'];

function parseChildren(nodes) {
  return nodes.map((element) => {
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

    return createElement(TabPanel, { ...props, ...otherAttributes }, children);
  });
}

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
