import React from 'react';
import classNames from 'classnames';
import useId from '../utilities/useId';
import { CloseIcon, CloseIconThin } from '../Icons';
import { t } from '../i18n';

const actionableKeys = ['Enter', 'Space', 'Backspace', 'Delete'];

export interface FilterChipProps {
  /**
   * Id for filter chip button. If not provided, a unique id will be automatically generated and used.
   */
  id?: string;
  /**
   * Class to be applied to the outer `<div>` that contains filter chip button.
   */
  className?: string;
  /**
   * Text for the filter chip.
   */
  label: string;
  /**
   *  Labels filter action, i.e., "Remove." For screenreader support.
   */
  ariaClearLabel?: string;
  /**
   * Function to call when filter chip is dismissed.
   */
  onDelete: () => any;
  /**
   *  Use alternate thinner close icon in place of standard.
   */
  useAlternateIcon?: boolean;
  /**
   * Sets the size of the chip to larger version.
   */
  size?: 'big';
}

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/filter-chip/).
 */
export const FilterChip = ({
  ariaClearLabel,
  className,
  label,
  id,
  onDelete,
  size,
  useAlternateIcon,
}: FilterChipProps) => {
  const filterChipId = useId('filter-chip--', id);

  function handleClick() {
    onDelete();
  }

  function handleKeyDown(evt: React.KeyboardEvent) {
    if (actionableKeys.includes(evt.key)) {
      handleClick();
      evt.preventDefault();
    }
  }

  const buttonClassNames = classNames(
    'ds-c-filter-chip__button',
    size && size === 'big' ? 'ds-c-filter-chip__button--big' : '',
    className
  );

  const iconContainerClassNames = classNames(
    'ds-c-filter-chip__clear-icon-container',
    useAlternateIcon ? 'ds-c-filter-chip__clear-icon-alternate-container' : ''
  );

  return (
    <button
      id={filterChipId}
      className={buttonClassNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <span
        className="ds-c-filter-chip__label"
        aria-hidden
        aria-describedby={`${filterChipId}-instructions`}
      >
        {label}
      </span>
      <span id={`${filterChipId}-instructions`} className="ds-u-visibility--screen-reader">
        {ariaClearLabel ?? t('filterChip.ariaClearLabel')} {t('filterChip.filter', { label })} .
      </span>
      <span className={iconContainerClassNames}>
        {useAlternateIcon ? <CloseIconThin /> : <CloseIcon />}
      </span>
    </button>
  );
};

export default FilterChip;
