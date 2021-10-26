import * as React from 'react';

export interface TabsProps {
  /**
   * Must only contain `TabPanel` components
   */
  children: React.ReactNode;
  /**
   * Sets the initial selected `TabPanel` state. If this isn't set, the first
   * `TabPanel` will be selected.
   */
  defaultSelectedId?: string;
  /**
   * A callback function that's invoked when the selected tab is changed.
   * `(selectedId, prevSelectedId) => void`
   */
  onChange?: (...args: any[]) => any;
  /**
   * Additional classes to be added to the component wrapping the tabs
   */
  tablistClassName?: string;
}

export default class Tabs extends React.Component<TabsProps, any> {
  render(): JSX.Element;
}
