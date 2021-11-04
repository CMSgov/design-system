import React, { FunctionComponent } from "react";

interface CardProps {
  className?: string;
}

const Card: FunctionComponent<CardProps> = ({ children, className }) => {
  return <div className={`m-c-card ${className}`}>{children}</div>;
};

export default Card;
