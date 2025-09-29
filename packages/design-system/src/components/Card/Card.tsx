import type * as React from 'react';
import { FunctionComponent } from 'react';

interface CardProps {
  /**
   * Content to be displayed inside the card
   */
  children?: React.ReactNode;
  /**
   * Additional css class names to be added to the Card element
   */
  className?: string;
}

export const Card: FunctionComponent<CardProps> = ({ children, className }: CardProps) => {
  return <div className={`ds-c-card ${className}`}>{children}</div>;
};

export default Card;
