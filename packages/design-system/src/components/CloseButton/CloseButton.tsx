import React from 'react';
import classNames from 'classnames';
import { CloseIconThin } from '../Icons';

interface BaseCloseButtonProps {
  /**
   * Additional classes to be added to the button element.
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
  <button
    className={classNames('ds-c-close-button', className)}
    type="button"
    {...buttonAttributes}
  >
    <CloseIconThin ariaHidden={false} />
  </button>
);

export default CloseButton;
