import type * as React from 'react';
import { FunctionComponent } from 'react';
import classNames from 'classnames';

export type NoteBoxHeadingLevel = '2' | '3' | '4' | '5' | '6';

interface NoteBoxProps {
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
  headingLevel?: NoteBoxHeadingLevel;
}

const NoteBox: FunctionComponent<NoteBoxProps> = (props: NoteBoxProps) => {
  const { bordered, children, className, heading, headingLevel = '2' } = props;

  const classes = classNames('ds-c-note-box', bordered && 'ds-c-note-box--bordered', className);
  let headingElement;
  if (typeof heading === 'string') {
    const Heading = `h${headingLevel}` as const;
    headingElement = <Heading className="ds-c-note-box__heading">{heading}</Heading>;
  } else {
    headingElement = heading;
  }

  return (
    <aside className={classes}>
      <div className="ds-c-note-box__body">
        {headingElement}
        <div className={heading ? 'ds-c-note-box__text' : ''}>{children}</div>
      </div>
    </aside>
  );
};

export default NoteBox;
