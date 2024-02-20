import React, { useState } from 'react';
import { AddIcon, RemoveIcon } from '../Icons';
import classNames from 'classnames';
import { t } from '../i18n';
import useId from '../utilities/useId';

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
  closeIconComponent?: React.ReactElement<any> | any | ((...args: any[]) => any);
  /**
   * Icon to overwrite default open icon
   */
  openIconComponent?: React.ReactElement<any> | any | ((...args: any[]) => any);
}

export interface AccordionItemState {
  isOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  buttonClassName,
  children,
  contentClassName,
  defaultOpen,
  heading,
  headingLevel,
  id,
  // TODO: Explore deprecating `isControlledOpen` in favor of `isOpen`
  isControlledOpen,
  onChange,
  closeIconComponent,
  openIconComponent,
}) => {
  const contentClasses = classNames('ds-c-accordion__content', contentClassName);
  const buttonClasses = classNames('ds-c-accordion__button', buttonClassName);
  const HeadingTag = `h${headingLevel}` as const;
  const isControlled = !!onChange;
  const contentId = useId('accordion-item--', id);
  const buttonId = `${contentId}__button`;
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

  const CloseIconComponent = closeIconComponent;
  const OpenIconComponent = openIconComponent;
  const closeIcon = (
    <CloseIconComponent
      className="ds-c-accordion__button-icon"
      title={t('accordion.close')}
      ariaHidden={false}
      id={`${contentId}__icon`}
    />
  );
  const openIcon = (
    <OpenIconComponent
      className="ds-c-accordion__button-icon"
      title={t('accordion.open')}
      ariaHidden={false}
      id={`${contentId}__icon`}
    />
  );

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
            {isItemOpen ? closeIcon : openIcon}
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

AccordionItem.defaultProps = {
  defaultOpen: false,
  headingLevel: '2',
  closeIconComponent: RemoveIcon,
  openIconComponent: AddIcon,
};

export default AccordionItem;
