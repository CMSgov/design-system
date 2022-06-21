import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export interface AccordionProps {
  /**
   * Applies a border to the accordion content.
   */
  bordered?: boolean;
  children?: React.ReactNode;
  /**
   * Class to be applied to the outer `<div>` that contains all accordion items.
   */
  className?: string;
  /**
   * Use alternate Accordion icon and styles in place of the standard styles
   */
  isAlternateStyles?: boolean;
}
const handleKeyDown = (e) => {
  const target = e.target;
  const accordionElement = e.currentTarget;

  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const triggers = Array.prototype.slice.call(
      accordionElement.querySelectorAll('.ds-c-accordion__button')
    );
    const direction = e.key === 'ArrowDown' ? 1 : -1;
    const index = triggers.indexOf(target);
    const length = triggers.length;
    const newIndex = (index + length + direction) % length;

    triggers[newIndex].focus();
    e.preventDefault();
  }
};

export const Accordion: FunctionComponent<AccordionProps> = ({
  bordered,
  children,
  className,
  isAlternateStyles,
}: AccordionProps) => {
  const classes = classNames(
    'ds-c-accordion',
    {
      'ds-c-accordion--bordered': bordered && !isAlternateStyles,
      'ds-c-accordion--alt-styles': isAlternateStyles,
    },
    className
  );

  const renderExtendChildren = (): React.ReactNode[] => {
    return React.Children.map(children, (child: React.ReactElement) => {
      // Extend props on children before rendering.
      return React.cloneElement(child, {
        _isAlternateStyles: isAlternateStyles,
      });
    });
  };

  return (
    <div onKeyDown={handleKeyDown} className={classes}>
      {isAlternateStyles ? renderExtendChildren() : children}
    </div>
  );
};

export default Accordion;
