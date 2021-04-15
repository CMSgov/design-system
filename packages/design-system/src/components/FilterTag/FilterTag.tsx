import { ClearIcon } from '../ClearIcon';
import React from 'react';
import classNames from 'classnames';

const actionableKeys = ['Enter', 'Backspace', 'Delete'];
const idFromValue = (value: string) => `${value}-tag`;

export interface FilterTagProps {
  /**
   * Id for filter tag button. If not provided, a unique id will be automatically generated and used.
   */
  id?: string;
  /**
   * Class to be applied to the outer `<div>` that contains filter tag button.
   */
  className?: string;
  /**
   * Text for the filter tag
   */
  label: string;
  /**  
   *
   Value for filter tag 
   */
  value: string;
  /**
   *  For screenreaders, text to read for removal
   */
  removeText: string;
  /**
   * When false, filter tag is not removable
   */
  readOnly?: boolean;
  /**
   * Function to call when filter tag is dismissed, will return value
   */
  onClear?: (value: string) => void;
}

interface FilterTagState {
  tagDismissed: boolean;
}

export class FilterTag extends React.Component<FilterTagProps, FilterTagState> {
  constructor(props: FilterTagProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      tagDismissed: false,
    };
  }

  handleClick(): void {
    const { readOnly, onClear, value } = this.props;
    if (!readOnly) {
      // Call on onClear passed in as a prop to component
      if (onClear) {
        onClear(value);
      }

      // Set tag as dismissed so it won't display
      this.setState({ tagDismissed: true });
    }
  }

  handleKeyDown(evt: React.KeyboardEvent): void {
    if (!this.props.readOnly && actionableKeys.includes(evt.key)) {
      this.handleClick();
      evt.preventDefault();
    }
  }

  render(): React.ReactNode {
    const { id, label, removeText, readOnly, className } = this.props;
    const rootClassNames = classNames('ds-c-filter-tag', className);
    const readOnlyTag = readOnly ? 'ds-c-filter-tag__button--read-only' : '';
    const buttonClassNames = classNames('ds-c-filter-tag__button', readOnlyTag);
    return (
      <>
        {!this.state.tagDismissed && (
          <div className={rootClassNames}>
            <button
              className={buttonClassNames}
              id={id || idFromValue(label)}
              onClick={this.handleClick}
              onKeyDown={this.handleKeyDown}
            >
              <span className="ds-c-filter-tag__label">{label}</span>
              {!readOnly && (
                <span
                  className="ds-c-filter-tag__clear-icon"
                  aria-label={removeText}
                >
                  <ClearIcon />
                </span>
              )}
            </button>
          </div>
        )}
      </>
    );
  }
}

export default FilterTag;
