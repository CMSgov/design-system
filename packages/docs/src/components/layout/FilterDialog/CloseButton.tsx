import React from 'react';
import classNames from 'classnames';
import { CloseIconThin } from '@cmsgov/design-system';

interface BaseCloseButtonProps {
  /**
   * Additional classes to be added to the root dialog element.
   */
  className?: string;
  /**
   * A custom `id` attribute for the dialog element
   */
  id?: string;
}

export type CloseButtonProps = Omit<
  React.ComponentPropsWithRef<'button'>,
  keyof BaseCloseButtonProps
> &
  BaseCloseButtonProps;

/**
 *
 */
export const CloseButton = ({ className, ...buttonAttributes }: CloseButtonProps) => (
  <button className={classNames('ds-c-close-button', className)} {...buttonAttributes}>
    <CloseIconThin />
  </button>
);

export default CloseButton;
