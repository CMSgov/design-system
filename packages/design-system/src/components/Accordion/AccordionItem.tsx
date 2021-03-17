import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';
import { AccordionPropKeys } from './Accordion';

interface AccordionItemProps {
  /**
   * Class to be applied to the header `<button>` of an accordion item.
   */
  buttonClassName?: string;

  children?: React.ReactNode;
  /**
   * Class to be applied to the heading `<h2>` tag of an accordion item.
   */
  contentClassName?: string;

  /**
   * Boolean to expand the accordion.
   */
  defaultOpen?: boolean;
  /**
   * Text for the accordion item heading.
   */
  heading: React.ReactNode | string;
  /**
   *  Heading type to override default `<h2>`.
   */
  headingLevel?: '1' | '2' | '3' | '4' | '5' | '6';
  /**
   *  If not provided, a unique id will be automatically generated and used.
   */
  id?: string;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({
  buttonClassName,
  children,
  contentClassName,
  defaultOpen,
  heading,
  headingLevel,
  id,
}) => {
  // Set the state for opening and closing an accordion item
  const [open, setOpen] = useState(!!defaultOpen);
  const onClick = () => {
    setOpen(!open);
  };
  const contentClasses = classNames('ds-c-accordion__content', contentClassName);
  const buttonClasses = classNames('ds-c-accordion__button', buttonClassName);
  const contentId = id || uniqueId('accordionItem_');
  const buttonId = `${contentId}-button`;
  const HeadingTag = `h${headingLevel}` || 'h2';
  console.log(HeadingTag);
  if (heading) {
    return (
      <>
        <HeadingTag className="ds-c-accordion__heading">
          <button
            className={buttonClasses}
            aria-expanded={open}
            aria-controls={contentId}
            id={buttonId}
            onClick={onClick}
          >
            {heading}
          </button>
        </HeadingTag>
        <div className={contentClasses} aria-labelledby={buttonId} id={contentId} hidden={!open}>
          {children}
        </div>
      </>
    );
  }
};

export const AccordionItemPropKeys = [
  'children',
  'contentClassName',
  'buttonClassName',
  'expanded',
  'heading',
  'headingLevel',
  'id',
];

export default AccordionItem;
