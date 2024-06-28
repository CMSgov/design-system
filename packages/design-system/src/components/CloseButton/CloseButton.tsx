import type * as React from 'react';
import classNames from 'classnames';
import useId from '../utilities/useId';
import { CloseIconThin } from '../Icons';

interface BaseCloseButtonProps {
  /**
   * An aria-label is required since the button content is only an X
   */
  'aria-label': string;
  /**
   * Hides or shows icon's aria text.
   */
  ariaHidden?: boolean;
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
export const CloseButton = ({
  className,
  id: idProp,
  ariaHidden = false,
  ...buttonAttributes
}: CloseButtonProps) => {
  const id = useId('close-button--', idProp);
  return (
    <button
      type="button"
      {...buttonAttributes}
      className={classNames('ds-c-close-button', className)}
      id={id}
    >
      <CloseIconThin ariaHidden={ariaHidden} id={`${id}__icon`} />
    </button>
  );
};

export default CloseButton;
