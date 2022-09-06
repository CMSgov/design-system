import React from 'react';

export interface ReviewLinkProps {
  /**
   * Provide this value to give screen readers longer,
   * more descriptive text to explain the context of the link.
   */
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
  href: string;
  onClick?: (...args: any[]) => any;
}

export const ReviewLink = (props: ReviewLinkProps) => {
  const handleClick = (event): void => {
    if (props.onClick) {
      props.onClick(event, props.href);
    }
  };

  return (
    <div>
      <a
        href={props.href}
        onClick={handleClick}
        className={props.className}
        aria-label={props.ariaLabel}
      >
        {props.children}
      </a>
    </div>
  );
};

export default ReviewLink;
