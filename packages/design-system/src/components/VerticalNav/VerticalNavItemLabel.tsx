import React from 'react';
import classNames from 'classnames';

export type VerticalNavItemLabelComponent =
  | React.ReactElement<any>
  | any
  | ((...args: any[]) => any);

export interface VerticalNavItemLabelProps {
  ariaCollapsedStateButtonLabel?: string;
  ariaExpandedStateButtonLabel?: string;
  collapsed?: boolean;
  component?: VerticalNavItemLabelComponent;
  hasSubnav?: boolean;
  label: React.ReactNode;
  onClick?: (...args: any[]) => any;
  selected?: boolean;
  subnavId: string;
  url?: string;
}

const DEFAULT_COMPONENT_TYPE = 'div';

export const VerticalNavItemLabel = (props: VerticalNavItemLabelProps): React.ReactElement => {
  /**
   * The type of element rendered ultimately depends on whether
   * this is meant to be a subnav toggle, link, or generic label
   * @return {String} The type of HTML tag
   */
  const componentType = (): string => {
    if (props.hasSubnav) {
      return 'button';
    } else if (props.component) {
      return props.component;
    } else if (props.url) {
      return 'a';
    }

    return DEFAULT_COMPONENT_TYPE;
  };

  const LabelComponent = componentType();

  const handleClick = (evt: React.MouseEvent | React.KeyboardEvent): void => props.onClick(evt);

  const anchorProps = (): { href: string } => {
    return {
      href: props.url,
    };
  };

  const buttonProps = (): { 'aria-controls': string; 'aria-expanded': boolean; title: string } => {
    return {
      'aria-controls': props.subnavId,
      'aria-expanded': !props.collapsed,
      title: props.collapsed
        ? props.ariaCollapsedStateButtonLabel
        : props.ariaExpandedStateButtonLabel,
    };
  };

  let otherProps: any = {
    className: classNames('ds-c-vertical-nav__label', {
      'ds-c-vertical-nav__label--current': props.selected,
      'ds-c-vertical-nav__label--parent': props.hasSubnav,
    }),
    onClick: props.onClick ? handleClick : undefined,
  };

  if (LabelComponent === 'button') {
    otherProps = Object.assign(otherProps, buttonProps());
  } else if (LabelComponent !== DEFAULT_COMPONENT_TYPE) {
    // Apply href if <a> or custom component type
    otherProps = Object.assign(otherProps, anchorProps());
  }

  return <LabelComponent {...otherProps}>{props.label}</LabelComponent>;
};

VerticalNavItemLabel.defaultProps = {
  ariaCollapsedStateButtonLabel: 'Expand sub-navigation',
  ariaExpandedStateButtonLabel: 'Collapse sub-navigation',
};

export default VerticalNavItemLabel;
