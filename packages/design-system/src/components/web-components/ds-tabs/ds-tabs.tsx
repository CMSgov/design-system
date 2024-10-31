import { define } from '../preactement/define';
import { Tabs, TabPanel } from '../../Tabs';
import { TabPanelProps } from '../../Tabs/TabPanel';
import { parseBooleanAttr, parseJsonAttr } from '../wrapperUtils';
import { createElement } from 'react';

const attributes = ['default-selected-id', 'selected-id', 'tablist-class-name', 'tabs-aria-label'];

function parseChildren(nodes) {
  return nodes.map((element) => {
    const attrs = element.props;

    if (!attrs.id || !attrs.children) {
      console.warn(
        'Each child passed to `ds-tabs` must include `id` and `children` attributes for `TabPanel` functionality.'
      );
      return null;
    }

    const {
      id,
      children,
      'data-classname': dataClassName,
      'data-selected': dataSelected,
      'data-disabled': dataDisabled,
      'data-tab': dataTab,
      'data-tab-class-name': dataTabClassName,
      'data-tab-href': dataTabHref,
      'data-tab-id': dataTabId,
      ...otherAttributes
    } = attrs;

    const props: Partial<TabPanelProps> = {
      id,
      className: dataClassName,
      selected: parseBooleanAttr(dataSelected),
      disabled: parseBooleanAttr(dataDisabled),
      tab: parseJsonAttr(dataTab),
      tabClassName: dataTabClassName,
      tabHref: dataTabHref,
      tabId: dataTabId,
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
