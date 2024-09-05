import { define } from '../preactement/define';
import React from 'react';
import { TabPanel } from '../../Tabs';
import { TabPanelProps } from '../../Tabs/TabPanel';
import { parseBooleanAttr } from '../wrapperUtils';

const tabPanelAttributes = [
  'class-name',
  'root-id',
  'selected',
  'disabled',
  'tab',
  'tab-class-name',
  'tab-href',
  'tab-id'
];

interface WrapperProps extends Omit<TabPanelProps, 'selected' | 'disabled' | 'tab'> {
  rootId: string;
  selected: string;
  disabled: string;
  tab: string;
}

const Wrapper = ({
  className,
  rootId,
  selected,
  disabled,
  tab,
  tabClassName,
  tabHref,
  tabId,
  ...otherProps
}: WrapperProps) => {
  return (
    <TabPanel
      className={className}
      id={rootId}
      selected={parseBooleanAttr(selected)}
      disabled={parseBooleanAttr(disabled)}
      tab={tab ? JSON.parse(tab) : undefined}
      tabClassName={tabClassName}
      tabHref={tabHref}
      tabId={tabId}
      {...otherProps}
    >
    </TabPanel>
  );
};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-tab-panel': JSX.IntrinsicElements['div'] & {
        [K in (typeof tabPanelAttributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-tab-panel', () => Wrapper, {
  attributes: tabPanelAttributes,
});
