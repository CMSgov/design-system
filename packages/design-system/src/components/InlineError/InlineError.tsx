import type * as React from 'react';
import classNames from 'classnames';
import { AlertCircleIcon } from '../Icons/AlertCircleIcon';
import { t } from '../i18n';
import useId from '../utilities/useId';

export interface InlineErrorProps {
  /**
   * Error text or HTML
   */
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * The ID of the error element
   */
  id?: string;
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed?: boolean;
}

/**
 * Inline errors are error messages that are paired directly with form fields.
 * They are built in to all form fields in the design system, but they can also
 * be used on their own to create custom fields.
 *
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/inline-error/).
 */
export function InlineError({
  children,
  className,
  id,
  inversed,
  ...otherProps
}: InlineErrorProps): React.ReactElement {
  const classes = classNames(
    'ds-c-inline-error',
    { 'ds-c-inline-error--inverse': inversed },
    className
  );
  const viewbox = '36 -12 186 186';

  return (
    <p
      {...otherProps}
      className={classes}
      id={useId('inline-error--', id)}
      aria-live="assertive"
      aria-atomic="true"
    >
      {children && (
        <>
          <AlertCircleIcon viewBox={viewbox} />
          <span className="ds-u-visibility--screen-reader">{`${t('inlineError.prefix')}: `}</span>
          {children}
        </>
      )}
    </p>
  );
}

export default InlineError;
