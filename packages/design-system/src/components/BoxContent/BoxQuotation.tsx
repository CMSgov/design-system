import type * as React from 'react';
import { FunctionComponent } from 'react';
import { RequireAtLeastOne } from '../utilities/requireAtLeastOne';
import classNames from 'classnames';

interface MinimumBoxQuotationProps {
  /**
   * Provide an author for the quote
   */
  author?: string;
  /**
   * Content to be displayed within the Box Quotation
   */
  children: React.ReactNode;
  /**
   * Provide a citation for the quote
   */
  citation?: React.ReactNode;
  /**
   * Additional classes to be added to the component
   */
  className?: string;
}

export type BoxQuotationProps = RequireAtLeastOne<MinimumBoxQuotationProps, 'citation' | 'author'>;

export const BoxQuotation: FunctionComponent<BoxQuotationProps> = (props: BoxQuotationProps) => {
  const { author, children, citation, className } = props;

  const classes = classNames('ds-c-box-content-quotation', className);

  const captionContent = () => {
    // We want to prioritize citations over authors, so if both are present only render the citation.
    if (citation) {
      return <cite className="ds-c-box-content-quotation--citation">{citation}</cite>;
    }
    // If citation is not present, but author is, render the author.
    if (author && !citation) {
      return `${author} `;
    }
  };

  return (
    <figure className={classes}>
      <blockquote className="ds-c-box-content-quotation--blockquote">{children}</blockquote>
      <figcaption className="ds-c-box-content-quotation--caption">
        {`\u2014`} {captionContent()}
      </figcaption>
    </figure>
  );
};
