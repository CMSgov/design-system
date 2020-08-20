import * as React from 'react';

export type StepLinkComponent = React.ReactElement<any> | ((...args: any[]) => any);

export interface StepLinkProps {
  /**
   * Label text or HTML.
   */
  children: React.ReactNode;
  href: string;
  stepId?: string;
  screenReaderText?: string;
  className?: string;
  onClick?: (...args: any[]) => any;
  component?: StepLinkComponent;
}

export default class StepLink extends React.Component<StepLinkProps, any> {
  render(): JSX.Element;
}
