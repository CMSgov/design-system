import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

interface AccordionItemProps {
  children?: React.ReactNode;
  /**
   * Class to be applied to the heading `<h2>` tag of an accordion item.
   */
  contentClassName?: string;
  /**
   * Class to be applied to the content `<div>` tag of an accordion item.
   */
  headingClassName?: string;
  /**
   * Boolean to expand the accordion.
   */
  expanded?: boolean;
  /**
   * Text for the accordion item heading.
   */
  heading: React.ReactNode | string;
  /**
   *  If not provided, a unique id will be automatically generated and used.
   */
  id?: string;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({
  children,
  contentClassName,
  headingClassName,
  expanded,
  heading,
  id,
}) => {
  // Set the state for opening and closing an accordion item
  const [open, setOpen] = useState(!!expanded);
  const onClick = () => {
    setOpen(!open);
  };
  const contentClasses = classNames('ds-c-accordion__content', contentClassName);
  const headingClasses = classNames('ds-c-accordion__heading', headingClassName);
  const contentId = id || uniqueId('accordionItem_');
  const buttonId = `${contentId}-button`;

  return (
    <>
      <h2 className={headingClasses}>
        <button
          className="ds-c-accordion__button"
          aria-expanded={open}
          aria-controls={contentId}
          id={buttonId}
          onClick={onClick}
        >
          {heading}
        </button>
      </h2>
      <div className={contentClasses} aria-labelledby={buttonId} id={contentId} hidden={!open}>
        {children}
      </div>
    </>
  );
};

export default AccordionItem;
