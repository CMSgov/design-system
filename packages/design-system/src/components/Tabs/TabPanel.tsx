import React from 'react';
import classnames from 'classnames';

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
   * The associated tab's label. Only applicable when the panel is a
   * child of `Tabs`.
   */
  tab?: string | React.ReactNode;
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
  // tabId is actually required, but it's not marked here since we generate
  // this id within the Tabs component. Otherwise React will yell at you even
  // though it's ultimately being passed in.
  /**
   * The `id` of the associated `Tab`. Used for the `aria-labelledby` attribute.
   */
  tabId?: string;
}

export const TabPanel = (props: TabPanelProps) => {
  const classes = classnames('ds-c-tabs__panel', props.className);

  return (
    <div
      aria-labelledby={props.tabId}
      aria-hidden={!props.selected}
      aria-disabled={props.disabled}
      className={classes}
      id={props.id}
      role="tabpanel"
    >
      {props.children}
    </div>
  );
};

// Set component name to make child.type.displayName available to other components (eg. Tab)
TabPanel.displayName = 'TabPanel';

TabPanel.defaultProps = {
  selected: false,
};

export default TabPanel;
