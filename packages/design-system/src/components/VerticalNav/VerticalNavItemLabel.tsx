import React from 'react';
import classNames from 'classnames';
import { ArrowIcon } from '../Icons';
import { t } from '../i18n';

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
  onClick?: (evt: React.MouseEvent | React.KeyboardEvent) => any;
  selected?: boolean;
  subnavId: string;
  url?: string;
  iconId?: string;
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

  const commonProps = {
    className: classNames('ds-c-vertical-nav__label', {
      'ds-c-vertical-nav__label--current': props.selected,
      'ds-c-vertical-nav__label--parent': props.hasSubnav,
    }),
    onClick: props.onClick ? handleClick : undefined,
  };

  let otherProps;
  if (LabelComponent === 'button') {
    const collapsedLabel = props.ariaCollapsedStateButtonLabel ?? t('verticalNav.expand');
    const expandedLabel = props.ariaExpandedStateButtonLabel ?? t('verticalNav.collapse');

    otherProps = {
      'aria-controls': props.subnavId,
      'aria-expanded': !props.collapsed,
      title: props.collapsed ? collapsedLabel : expandedLabel,
    };
  } else if (LabelComponent !== DEFAULT_COMPONENT_TYPE) {
    // Apply href if <a> or custom component type
    otherProps = {
      'aria-current': props.selected,
      href: props.url,
    };
  }

  return (
    <LabelComponent {...commonProps} {...otherProps}>
      {props.label}
      {props.hasSubnav && <ArrowIcon direction={props.collapsed ? 'down' : 'up'} />}
    </LabelComponent>
  );
};

export default VerticalNavItemLabel;
