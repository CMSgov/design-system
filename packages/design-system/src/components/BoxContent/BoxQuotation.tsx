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
  citation?: string;
  /**
   * Additional classes to be added to the component
   */
  className?: string;
}

export type BoxQuotationProps = RequireAtLeastOne<MinimumBoxQuotationProps, 'citation' | 'author'>;

export const BoxQuotation: FunctionComponent<BoxQuotationProps> = (props: BoxQuotationProps) => {
  const { author, children, citation, className } = props;

  const classes = classNames('ds-c-box-content-quotation', className);

  return (
    <figure className={classes}>
      <blockquote className="ds-c-box-content-quotation--blockquote">{children}</blockquote>
      <figcaption className="ds-c-box-content-quotation--caption">
        {author && `\u2014 ${author} `}
        {author && citation && '/ '}
        {citation && <cite>{citation}</cite>}
      </figcaption>
    </figure>
  );
};
