import React from 'react';
import { AddIcon, RemoveIcon } from '../Icons';
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
export class AccordionItem extends React.Component<AccordionItemProps, AccordionItemState> {
  static defaultProps = {
    headingLevel: '2',
    closeIcon: (
      <RemoveIcon
        className="ds-c-accordion__button-icon"
        title={t('accordion.close')}
        ariaHidden={false}
      />
    ),
    openIcon: (
      <AddIcon
        className="ds-c-accordion__button-icon"
        title={t('accordion.open')}
        ariaHidden={false}
      />
    ),
  };

  buttonId: string;
  contentId: string;
  isControlled: boolean;

  constructor(props: AccordionItemProps) {
    super(props);

    this.isControlled = !!props.onChange;
    this.state = this.isControlled ? {} : { isOpen: !!props.defaultOpen };
    this.handleClick = this.handleClick.bind(this);
    this.contentId = props.id || uniqueId('accordionItem_');
    this.buttonId = `${this.contentId}-button`;
  }

  // Set the state for opening and closing an accordion item
  handleClick(): void {
    if (this.isControlled) {
      this.props.onChange();
    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
    const {
      buttonClassName,
      children,
      contentClassName,
      heading,
      headingLevel = '2',
      isControlledOpen,
      closeIcon,
      openIcon,
    } = this.props;

    const contentClasses = classNames('ds-c-accordion__content', contentClassName);
    const buttonClasses = classNames('ds-c-accordion__button', buttonClassName);
    const HeadingTag = `h${headingLevel}` as const;
    const isItemOpen = this.isControlled ? isControlledOpen : this.state.isOpen;
    const CloseIcon = closeIcon as React.ReactNode;
    const OpenIcon = openIcon as React.ReactNode;

    if (heading) {
      return (
        <>
          <HeadingTag className="ds-c-accordion__heading">
            <button
              className={buttonClasses}
              aria-expanded={isItemOpen}
              aria-controls={this.contentId}
              id={this.buttonId}
              onClick={this.handleClick}
            >
              {heading}
              {isItemOpen ? CloseIcon : OpenIcon}
            </button>
          </HeadingTag>
          <div
            className={contentClasses}
            aria-labelledby={this.buttonId}
            id={this.contentId}
            hidden={this.isControlled ? !isControlledOpen : !this.state.isOpen}
          >
            {children}
          </div>
        </>
      );
    }
  }
}

export default AccordionItem;
