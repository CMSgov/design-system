import Button from '../Button/Button';
import Downshift from 'downshift';
import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import noop from 'nooop';
import uniqueId from 'lodash.uniqueid';

/**
 * An `AutocompleteField` component renders a typeahead input field as well as supporting UI
 * elements like a label, and a clear input button.
 */
export class AutocompleteField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = uniqueId('autocomplete_');
  }

  render() {
    const { ariaLabel, buttonText, items, labelText, onChange } = this.props;

    return (
      <Downshift
        onChange={onChange}
        render={({
          clearSelection,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          selectedItem
        }) => (
          <div className="ds-u-display--flex ds-u-flex-wrap--wrap ds-c-autocomplete">
            <FormLabel
              className="ds-u-margin-top--0"
              component="label"
              fieldId={this.id}
            >
              {labelText}
            </FormLabel>

            <input
              {...getInputProps({
                className: 'ds-c-field',
                id: this.id
              })}
            />

            {isOpen ? (
              <div className="ds-u-border--1 ds-u-padding--1 ds-c-autocomplete__list">
                <ul className="ds-c-list--bare">
                  {items
                    .filter(
                      i =>
                        !inputValue ||
                        i.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        {...getItemProps({ item })}
                        className="ds-u-padding--1 ds-c-autocomplete__list-item"
                        key={item}
                        style={{
                          backgroundColor:
                            highlightedIndex === index ? 'gray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }}
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}

            <Button
              aria-label={ariaLabel}
              className="ds-u-margin-left--auto ds-u-padding-right--0"
              href="javascript:void(0);"
              onClick={clearSelection}
              size="small"
              variation="transparent"
            >
              {buttonText}
            </Button>
          </div>
        )}
      />
    );
  }
}

AutocompleteField.defaultProps = {
  ariaLabel: 'Clear typeahead and search again',
  buttonText: 'Search again',
  onChange: noop
};

AutocompleteField.propTypes = {
  ariaLabel: PropTypes.string,
  buttonText: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  labelText: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default AutocompleteField;
