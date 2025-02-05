import type * as React from 'react';
import { FunctionComponent } from 'react';
import classNames from 'classnames';

export type BoxContentHeadingLevel = '2' | '3' | '4' | '5' | '6';

interface BoxContentProps {
  /**
   * Applies a border to the box content.
   */
  bordered?: boolean;
  /**
   * Content to be displayed within the Box
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the component
   */
  className?: string;
  /**
   * Text for the box content heading
   */
  heading?: React.ReactNode;
  /**
   * Heading type to override default `<h2>`.
   */
  headingLevel?: BoxContentHeadingLevel;
}

const BoxContent: FunctionComponent<BoxContentProps> = (props: BoxContentProps) => {
  const { bordered, children, className, heading, headingLevel = '2' } = props;

  const classes = classNames(
    'ds-c-box-content',
    bordered && 'ds-c-box-content--bordered',
    className
  );
  let headingElement;
  if (typeof heading === 'string') {
    const Heading = `h${headingLevel}` as const;
    headingElement = <Heading className="ds-c-box-content__heading">{heading}</Heading>;
  } else {
    headingElement = heading;
  }

  return (
    <aside className={classes}>
      <div className="ds-c-box-content__body">
        {headingElement}
        <div className={heading ? 'ds-c-box-content__text' : ''}>{children}</div>
      </div>
    </aside>
  );
};

export default BoxContent;
