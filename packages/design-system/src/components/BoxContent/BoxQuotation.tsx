import type * as React from 'react';
import { FunctionComponent } from 'react';
import { RequireAtLeastOne } from '../utilities/requireAtLeastOne';

interface MinimumBoxQuotationProps {
  /**
   * Content to be displayed within the Box Quotation
   */
  children: React.ReactNode;
  /**
   * Provide a citation for the quote
   */
  citation?: string;
  /**
   * Provide an author for the quote
   */
  author?: string;
}

export type BoxQuotationProps = RequireAtLeastOne<MinimumBoxQuotationProps, 'citation' | 'author'>;

export const BoxQuotation: FunctionComponent<BoxQuotationProps> = (props: BoxQuotationProps) => {
  const { author, children, citation } = props;
  return (
    <figure className="ds-c-box-content-quotation">
      <blockquote className="ds-c-box-content-quotation--blockquote" cite={citation || author}>
        {children}
      </blockquote>
      <figcaption className="ds-c-box-content-quotation--caption">
        {author ? `\u2014 ${author} ` : ''}
        {author && citation ? '/ ' : ''}
        {citation && <cite>{citation}</cite>}
      </figcaption>
    </figure>
  );
};
