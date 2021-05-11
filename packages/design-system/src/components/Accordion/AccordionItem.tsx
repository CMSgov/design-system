import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

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
}
export interface AccordionItemState {
  isOpen?: boolean;
}
export class AccordionItem extends React.Component<AccordionItemProps, AccordionItemState> {
  static defaultProps = {
    headingLevel: '2',
  };

  /* eslint-disable react/sort-comp */
  buttonId: string;
  contentId: string;
  isControlled: boolean;
  /* eslint-enable react/sort-comp */

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

  render(): React.ReactNode {
    const {
      buttonClassName,
      children,
      contentClassName,
      heading,
      headingLevel = '2',
      isControlledOpen,
    } = this.props;
    const contentClasses = classNames('ds-c-accordion__content', contentClassName);
    const buttonClasses = classNames('ds-c-accordion__button', buttonClassName);
    const HeadingTag = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    if (heading) {
      return (
        <>
          <HeadingTag className="ds-c-accordion__heading">
            <button
              className={buttonClasses}
              aria-expanded={this.isControlled ? isControlledOpen : this.state.isOpen}
              aria-controls={this.contentId}
              id={this.buttonId}
              onClick={this.handleClick}
            >
              {heading}
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
