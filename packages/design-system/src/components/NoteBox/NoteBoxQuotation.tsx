import type * as React from 'react';
import { FunctionComponent } from 'react';
import { RequireAtLeastOne } from '../utilities/requireAtLeastOne';
import classNames from 'classnames';

interface MinimumNoteBoxQuotationProps {
  /**
   * Provide an author for the quote. It is required if a citation is not provided.
   */
  author?: string;
  /**
   * Content to be displayed within the Box Quotation
   */
  children: React.ReactNode;
  /**
   * Provide a citation for the quote. A citation is the title of a cited creative work. This can be a website, book chapter, but not an author. This component can accept more complex HTML in addition to strings, so passing in a link directly to the citation source is possible.
   */
  citation?: React.ReactNode;
  /**
   * Additional classes to be added to the component
   */
  className?: string;
}

export type NoteBoxQuotationProps = RequireAtLeastOne<
  MinimumNoteBoxQuotationProps,
  'citation' | 'author'
>;

const NoteBoxQuotation: FunctionComponent<NoteBoxQuotationProps> = (
  props: NoteBoxQuotationProps
) => {
  const { author, children, citation, className } = props;

  const classes = classNames('ds-c-note-box-quotation', className);

  const CaptionContent: FunctionComponent = () => {
    // We want to prioritize citations over authors, so if both are present only render the citation.
    if (citation) {
      return (
        <cite className="ds-c-note-box-quotation--citation">
          {`\u2014`}
          {citation}
        </cite>
      );
    }
    // If citation is not present, but author is, render the author.
    if (author) {
      return (
        <>
          {`\u2014`}
          {author}
        </>
      );
    }
    if (process.env.NODE_ENV !== 'production') {
      if (!citation && !author) {
        console.warn(
          `[Warning]: You must include either an author prop or a citation prop on your NoteBoxQuotation component.`
        );
      }
    }
    return null;
  };

  return (
    <figure className={classes}>
      <blockquote className="ds-c-note-box-quotation--blockquote">{children}</blockquote>
      <figcaption className="ds-c-note-box-quotation--caption">
        <CaptionContent />
      </figcaption>
    </figure>
  );
};

export default NoteBoxQuotation;
