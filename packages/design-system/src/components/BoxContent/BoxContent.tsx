import type * as React from 'react';
import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { BoxQuotation } from './BoxQuotation';

export type BoxContentHeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

interface BoxContentProps {
  /**
   * Provide an author for the quote
   */
  author?: string;
  /**
   * Applies a border to the box content.
   */
  bordered?: boolean;
  /**
   * Content to be displayed within the Box
   */
  children?: React.ReactNode;
  /**
   * Provide a citation for the quote
   */
  citation?: string;
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
  /**
   * Use to highlight a direct quotation
   */
  quote?: boolean;
}

const BoxContent: FunctionComponent<BoxContentProps> = (props: BoxContentProps) => {
  const {
    author,
    bordered,
    children,
    citation,
    className,
    heading,
    headingLevel = '2',
    quote,
  } = props;

  const classes = classNames(
    'ds-c-box-content',
    bordered && 'ds-c-box-content--bordered',
    className
  );
  let headingElement;
  if (heading) {
    const Heading = `h${headingLevel}` as const;
    headingElement = <Heading className="ds-c-box-content__heading">{heading}</Heading>;
  }
  return (
    <aside className={classes}>
      <div className="ds-c-box-content__body">
        {quote ? (
          <span className="ds-text-body--lg">
            <strong>{'"'}</strong>
          </span>
        ) : (
          headingElement
        )}
        <div className={heading ? 'ds-c-box-content__text' : ''}>
          {quote ? (
            <BoxQuotation citation={citation} author={author}>
              {children}
            </BoxQuotation>
          ) : (
            children
          )}
        </div>
      </div>
    </aside>
  );
};

export default BoxContent;
