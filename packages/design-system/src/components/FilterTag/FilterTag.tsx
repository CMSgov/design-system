import { ClearIcon } from '../ClearIcon';
import React from 'react';
import classNames from 'classnames';

const actionableKeys = ['Enter', 'Backspace', 'Delete'];
const idFromValue = (value: string) => `${value}-tag`;

export interface FilterTagProps {
  id?: string;
  className?: string;
  label: string;
  value: string;
  removeText: string;
  readOnly?: boolean;
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

    return (
      <>
        {!this.state.tagDismissed && (
          <div className={rootClassNames}>
            <button
              className="ds-c-filter-tag__button"
              id={id || idFromValue(label)}
              onClick={this.handleClick}
              onKeyDown={this.handleKeyDown}
            >
              {!readOnly && <span className="ds-u-visibility--screen-reader">{removeText} </span>}
              <span className="ds-c-filter-tag__label">{label}</span>
              {!readOnly && (
                <span className="ds-c-filter-tag__clear-icon">
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
