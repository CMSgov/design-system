import { CloseIcon, CloseIconThin } from '../Icons';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
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
  size?: string;
}

export class FilterChip extends React.Component<FilterChipProps> {
  filterChipId: string;

  constructor(props: FilterChipProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.filterChipId = props.id || uniqueId('filter_');
  }

  handleClick(): void {
    this.props.onDelete();
  }

  handleKeyDown(evt: React.KeyboardEvent): void {
    if (actionableKeys.includes(evt.key)) {
      this.handleClick();
      evt.preventDefault();
    }
  }

  render() {
    const { label, ariaClearLabel, className, useAlternateIcon, size } = this.props;

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
        id={`${this.filterChipId}`}
        className={buttonClassNames}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        type="button"
      >
        <span
          className="ds-c-filter-chip__label"
          aria-hidden
          aria-describedby={`${this.filterChipId}-instructions`}
        >
          {label}
        </span>
        <span id={`${this.filterChipId}-instructions`} className="ds-u-visibility--screen-reader">
          {ariaClearLabel ?? t('filterChip.ariaClearLabel')} {t('filterChip.filter', { label })} .
        </span>
        <span className={iconContainerClassNames}>
          {useAlternateIcon ? <CloseIconThin /> : <CloseIcon />}
        </span>
      </button>
    );
  }
}

export default FilterChip;
