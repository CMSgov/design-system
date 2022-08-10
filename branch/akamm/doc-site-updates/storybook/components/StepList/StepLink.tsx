import React from 'react';

export interface StepLinkComponentProps {
  href?: string;
  onClick: (event: React.SyntheticEvent<any>) => any;
  className?: string;
  children: React.ReactNode;
}

export interface StepLinkProps {
  /**
   * Label text or HTML.
   */
  children: React.ReactNode;
  href?: string;
  stepId?: string;
  screenReaderText?: string;
  className?: string;
  onClick?: (href?: string, stepId?: string) => any;
  component?: React.ComponentType<StepLinkComponentProps> | keyof JSX.IntrinsicElements;
}

export const StepLink = (props: StepLinkProps) => {
  function handleClick(event: React.SyntheticEvent) {
    if (props.onClick) {
      event.preventDefault();
      props.onClick(props.href, props.stepId);
    }
  }

  const ComponentType = props.component ?? 'a';

  return (
    <ComponentType href={props.href} onClick={handleClick} className={props.className}>
      {props.children}
      {props.screenReaderText && (
        <span className="ds-u-visibility--screen-reader"> {props.screenReaderText}</span>
      )}
    </ComponentType>
  );
};

export default StepLink;
