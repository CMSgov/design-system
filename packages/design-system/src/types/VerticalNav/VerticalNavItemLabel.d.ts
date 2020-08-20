import * as React from 'react';

export type VerticalNavItemLabelComponent =
  | React.ReactElement<any>
  | any
  | ((...args: any[]) => any);

export interface VerticalNavItemLabelProps {
  ariaCollapsedStateButtonLabel?: string;
  ariaExpandedStateButtonLabel?: string;
  collapsed?: boolean;
  component?: VerticalNavItemLabelComponent;
  hasSubnav?: boolean;
  label: React.ReactNode;
  onClick?: (...args: any[]) => any;
  selected?: boolean;
  subnavId: string;
  url?: string;
}

export default class VerticalNavItemLabel extends React.Component<VerticalNavItemLabelProps, any> {
  render(): JSX.Element;
}
