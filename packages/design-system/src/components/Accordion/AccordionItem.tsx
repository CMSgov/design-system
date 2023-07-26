import React, { useState } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { t } from '../i18n';

export interface AccordionItemProps {
  /**
   * Class to be applied to the header `<button>` of an accordion item.
   */
  buttonClassName?: string;

  children?: React.ReactNode;
  /**
   * Class to be applied to the content `<div>` tag of an accordion item.
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
  /**
   * Sets the accordion panel's open state. Use this in combination with `onChange`
   * for a controlled accordion; otherwise, set `defaultOpen`.
   */
  isControlledOpen?: boolean;
  /**
   * A callback function that's invoked when a controlled accordion panel is selected or deselected.
   */
  onChange?: () => void;
  /**
   * Icon to overwrite default close icon
   */
  closeIcon?: React.ReactNode;
  /**
   * Icon to overwrite default open icon
   */
  openIcon?: React.ReactNode;
}

export interface AccordionItemState {
  isOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  buttonClassName,
  children,
  contentClassName,
  defaultOpen = false,
  heading,
  headingLevel = '2',
  id,
  // TODO: Explore deprecating `isControlledOpen` in favor of `isOpen`
  isControlledOpen,
  onChange,
  closeIcon = (
    <svg
      aria-hidden="false"
      className="ds-c-accordion__button-icon ds-c-icon ds-c-icon--remove "
      id="icon-27"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 13H5v-2h14v2z"></path>
    </svg>
  ),
  openIcon = (
    <svg
      aria-hidden="false"
      className="ds-c-accordion__button-icon ds-c-icon ds-c-icon--add "
      id="icon-1"
      viewBox="3 3 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </svg>
  ),
}) => {
  const contentClasses = classNames('ds-c-accordion__content', contentClassName);
  const buttonClasses = classNames('ds-c-accordion__button', buttonClassName);
  const HeadingTag = `h${headingLevel}` as const;
  const CloseIcon = closeIcon as React.ReactNode;
  const OpenIcon = openIcon as React.ReactNode;
  const isControlled = !!onChange;
  const contentId = id || uniqueId('accordionItem_');
  const buttonId = `${contentId}-button`;
  const [isOpen, setIsOpen] = useState(isControlled ? isControlledOpen : defaultOpen);

  // Set the state for opening and closing an accordion item
  const handleClick = () => {
    if (isControlled) {
      onChange();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const isItemOpen = isControlled ? isControlledOpen : isOpen;

  if (heading) {
    return (
      <>
        <HeadingTag className="ds-c-accordion__heading">
          <button
            className={buttonClasses}
            aria-expanded={isItemOpen}
            aria-controls={contentId}
            id={buttonId}
            onClick={handleClick}
            type="button"
          >
            {heading}
            {isItemOpen ? CloseIcon : OpenIcon}
          </button>
        </HeadingTag>
        <div
          className={contentClasses}
          aria-labelledby={buttonId}
          id={contentId}
          hidden={isControlled ? !isControlledOpen : !isOpen}
        >
          {children}
        </div>
      </>
    );
  }
};

export default AccordionItem;
