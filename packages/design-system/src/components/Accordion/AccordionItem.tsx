import React from 'react';
import { AccordionContext } from './Accordion';
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
  index?: number;
  // onChange?: ( index: number, id: string) => void;
}
export interface AccordionItemState {
  isOpen: boolean;
}
export class AccordionItem extends React.Component<AccordionItemProps, AccordionItemState> {
  contentId: string;
  buttonId: string;
  onChange: ( index: number, id: string) => void;
  variation: string;
  isControlled: boolean;

  static defaultProps = {
    headingLevel: '2',
  };
  
  static contextType = AccordionContext;

  constructor(props: AccordionItemProps, context:React.ContextType<typeof AccordionContext>) {
    super(props);

    this.state = { isOpen: !!props.defaultOpen };
    this.isControlled = (context.variation === 'controlled');
    this.onChange = context.onChange;
    this.handleClick = this.handleClick.bind(this);
    this.contentId = props.id || uniqueId('accordionItem_');
    this.buttonId = `${this.contentId}-button`;
  }

  // Set the state for opening and closing an accordion item
  handleClick(): void {
    if (this.isControlled) {
      this.onChange(this.props.index, this.buttonId);
      this.setState({ isOpen: !!this.props.defaultOpen});
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
              aria-expanded={this.state.isOpen}
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
