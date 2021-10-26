import * as React from 'react';

export type ReviewHeadingLevel = '1' | '2' | '3' | '4' | '5';

export interface ReviewProps {
  /**
   * `Review` component's body HTML.
   */
  children: React.ReactNode;
  className?: string;
  /**
   * Optional label to give screenreaders longer, more descriptive text to
   * explain the context of an edit link.
   */
  editAriaLabel?: string;
  /**
   * An optional node in place of the edit link. If this defined, no edit link will be shown.
   */
  editContent?: React.ReactNode;
  /**
   * Href for the edit link. If this is undefined, no edit link will be shown.
   */
  editHref?: string;
  editText?: React.ReactNode;
  heading?: React.ReactNode;
  /**
   * Heading type to override default `<h3>`.
   */
  headingLevel?: ReviewHeadingLevel;
  /**
   * An optional function that is executed on edit link click. The event and
   * props.editHref value are passed to this function.
   */
  onEditClick?: (...args: any[]) => any;
}

export default class Review extends React.Component<ReviewProps, any> {
  render(): JSX.Element;
}
