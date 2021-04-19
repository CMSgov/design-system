import React, { FunctionComponent, useState } from 'react';
import AccordionContext from './Accordion';
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

  onClick: (id: string, index: number) => void;

  index?: number;
}
export interface AccordionItemState {
  isOpen: boolean;
}
export class AccordionItem extends React.Component<AccordionItemProps, AccordionItemState> {
  contentId: string;
  buttonId: string;

  static defaultProps = {
    headingLevel: '2',
  };

  constructor(props: AccordionItemProps) {
    super(props);

    this.state = { isOpen: !!props.defaultOpen };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.contentId = props.id || uniqueId('accordionItem_');
    this.buttonId = `${this.contentId}-button`;
  }

  // Set the state for opening and closing an accordion item
  handleOnClick(variation: string, id: string, index: number): void {
    if ((variation = 'controlled')) {
      this.props.onClick(id, index);
    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render(): React.ReactNode {
    let variation = this.context;
    const { buttonClassName, children, contentClassName, heading, headingLevel = '2' } = this.props;
    const contentClasses = classNames('ds-c-accordion__content', contentClassName);
    const buttonClasses = classNames('ds-c-accordion__button', buttonClassName);
    const HeadingTag = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    if (heading) {
      return (
        <>
          <HeadingTag className="ds-c-accordion__heading">
            <button
              className={buttonClasses}
              aria-expanded={this.state.isOpen}
              aria-controls={this.contentId}
              id={this.buttonId}
              onClick={this.handleOnClick(variation)}
            >
              {heading}
            </button>
          </HeadingTag>
          <div
            className={contentClasses}
            aria-labelledby={this.buttonId}
            id={this.contentId}
            hidden={!this.state.isOpen}
          >
            {children}
          </div>
        </>
      );
    }
  }
}

export default AccordionItem;
