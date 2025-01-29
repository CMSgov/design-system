import type * as React from 'react';
import { FunctionComponent } from 'react';

export interface BoxQuotationsProps {
  /**
   * Content to be displayed within the Box Quotation
   */
  children?: React.ReactNode;
  /**
   * Provide a citation for the quote
   */
  citation?: string;
  /**
   * Provide an author for the quote
   */
  author?: string;
}

export const BoxQuotation: FunctionComponent<BoxQuotationsProps> = (props: BoxQuotationsProps) => {
  const { author, children, citation } = props;
  return (
    <figure>
      <blockquote cite={citation}>{children}</blockquote>
      {author && <figcaption>&mdash; {author}</figcaption>}
    </figure>
  );
};
