import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import AccordionItem, { AccordionItemData } from './AccordionItem';

interface AccordionProps {
  items: AccordionItemData[];
}

const classes = classNames(
  'ds-c-accordion',
  this.props.variation && `ds-c-accordion--${this.props.variation}`,
  this.props.className
);

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className={classes}>
      {items.map((i) => (
        <AccordionItem key={i.id} content={i.content} expanded={i.expanded} title={i.title} />
      ))}
    </div>
  );
};

Accordion.propTypes = {
  className: PropTypes.string,
  /**
   * A string corresponding to the `Accordion` variation classes (`bordered`)
   */
  variation: PropTypes.oneOf(['bordered']),
};

export default Accordion;
