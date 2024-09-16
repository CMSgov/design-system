import { define } from '../preactement/define';
import { TabPanel } from '../../Tabs';
import { TabPanelProps } from '../../Tabs/TabPanel';
import { parseBooleanAttr } from '../wrapperUtils';
import { ReactNode } from 'react';

const tabPanelAttributes = [
  'class-name',
  'root-id',
  'selected',
  'disabled',
  'tab',
  'tab-class-name',
  'tab-href',
  'tab-id'
] as const;

interface WrapperProps extends Omit<TabPanelProps, 'selected' | 'disabled' | 'tab'> {
  rootId: string;
  selected: string;
  disabled: string;
  tab: string;
}

const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const Wrapper = ({
  className,
  rootId,
  selected,
  disabled,
  tab,
  tabClassName,
  tabHref,
  tabId,
  children,
  ...otherProps
}: WrapperProps & { children?: ReactNode }) => {

  return (
    <TabPanel
      className={className}
      id={rootId}
      selected={parseBooleanAttr(selected)}
      disabled={parseBooleanAttr(disabled)}
      tab={isJsonString(tab) ? JSON.parse(tab) : tab}
      tabClassName={tabClassName}
      tabHref={tabHref}
      tabId={tabId}
      {...otherProps}
    >
      {children}
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
