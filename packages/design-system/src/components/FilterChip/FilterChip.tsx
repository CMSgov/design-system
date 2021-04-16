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
   *
   Value for filter chip 
   */
  value: string;
  /**
   *  For screenreaders, text to read for removal
   */
  removeText: string;
  /**
   * Function to call when filter chip is dismissed, will return value.
   * If no onDelete function is included, no clear icon will be shown
   */
  onDelete?: (value: string) => void;
}

export class FilterChip extends React.Component<FilterChipProps> {
  constructor(props: FilterChipProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick(): void {
    const { onDelete, value } = this.props;
    if (onDelete) {
      // Call on onDelete passed in as a prop to component
      onDelete(value);
    }
  }

  handleKeyDown(evt: React.KeyboardEvent): void {
    if (this.props.onDelete && actionableKeys.includes(evt.key)) {
      this.handleClick();
      evt.preventDefault();
    }
  }

  render(): React.ReactNode {
    const { id, label, onDelete, removeText, className } = this.props;
    const rootClassNames = classNames('ds-c-filter-chip', className);
    const readOnlyTag = onDelete ? '' : 'ds-c-filter-chip__button--read-only';
    const buttonClassNames = classNames('ds-c-filter-chip__button', readOnlyTag);

    return (
      <>
        <div className={rootClassNames}>
          <button
            className={buttonClassNames}
            id={id || uniqueId(`filter_${this.props.value}`)}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            disabled={!onDelete}
          >
            <span className="ds-c-filter-chip__label">{label}</span>
            {onDelete && (
              <span className="ds-c-filter-chip__clear-icon" aria-label={removeText}>
                <ClearIcon />
              </span>
            )}
          </button>
        </div>
      </>
    );
  }
}

export default FilterChip;
