import * as React from 'react';

export interface TabPanelProps {
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * A unique `id`, to be used on the rendered panel element.
   */
  id: string;
  selected?: boolean;
  disabled?: boolean;
  /**
   * eslint-disable react/no-unused-prop-types
   */
  tab?: string;
  /**
   * Additional classes for the associated tab. Only applicable when the panel
   * is a child of `Tabs`.
   */
  tabClassName?: string;
  /**
   * The associated tab's `href`. Only applicable when the panel is a
   * child of `Tabs`.
   */
  tabHref?: string;
  /**
   * eslint-enable react/no-unused-prop-types
   */
  tabId?: string;
}

declare const TabPanel: React.FC<TabPanelProps>;

export default TabPanel;
