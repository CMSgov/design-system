import classNames from 'classnames';
import { t } from '../i18n';

export type SpinnerSize = 'small' | 'big';

export interface SpinnerProps {
  /**
   * The text announced to screen readers
   */
  'aria-valuetext'?: string;
  /**
   * Additional classes to be added to the spinner element.
   * Useful for adding utility classes.
   */
  className?: string;
  /**
   * Applies the inverse theme styling
   */
  inversed?: boolean;
  /**
   * Adds a background behind the spinner for extra contrast
   */
  filled?: boolean;
  /**
   * Landmark role so the spinner can receive keyboard focus
   */
  role?: string;
  /**
   * Smaller or larger variant
   */
  size?: SpinnerSize;
}

export const Spinner: React.FunctionComponent<SpinnerProps> = (props: SpinnerProps) => {
  const className = classNames(
    'ds-c-spinner',
    props.size && `ds-c-spinner--${props.size}`,
    props.inversed && 'ds-c-spinner--inverse',
    props.filled && 'ds-c-spinner--filled',
    props.className
  );

  return (
    <span className={className} role={props.role}>
      <span className="ds-u-visibility--screen-reader">
        {props['aria-valuetext'] ?? t('spinner.ariaText')}
      </span>
    </span>
  );
};

Spinner.defaultProps = {
  role: 'status',
};

export default Spinner;
