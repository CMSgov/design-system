import { ClearIcon } from '../ClearIcon';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

const actionableKeys = ['Enter', 'Backspace', 'Delete'];

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
   * Text for the filter chip
   */
  label: string;
  /**
   *  For screenreaders, text to read for removal
   */
  ariaClearLabel: string;
  /**
   * Function to call when filter chip is dismissed
   */
  onDelete: () => void;
}

export class FilterChip extends React.Component<FilterChipProps> {
  constructor(props: FilterChipProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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

  render(): React.ReactNode {
    const { id, label, ariaClearLabel, className } = this.props;
    const buttonClassNames = classNames('ds-c-filter-chip__button', className);

    return (
      <>
        <button
          className={buttonClassNames}
          id={id || uniqueId(`filter_`)}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          <span className="ds-c-filter-chip__label">{label}</span>
          <span className="ds-c-filter-chip__clear-icon-container" aria-label={ariaClearLabel}>
            <ClearIcon />
          </span>
        </button>
      </>
    );
  }
}

export default FilterChip;
