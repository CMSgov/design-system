import * as React from 'react';

export interface ReviewLinkProps {
  /**
   * Provide this value to give screenreaders longer, more descriptive text to
   * explain the context of the link.
   */
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
  href: string;
  onClick?: (...args: any[]) => any;
}

export default class ReviewLink extends React.Component<ReviewLinkProps, any> {
  render(): JSX.Element;
}
