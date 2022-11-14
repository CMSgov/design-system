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

const Card: FunctionComponent<CardProps> = ({ children, className }: CardProps) => {
  return <div className={`m-c-card ${className}`}>{children}</div>;
};

export default Card;
