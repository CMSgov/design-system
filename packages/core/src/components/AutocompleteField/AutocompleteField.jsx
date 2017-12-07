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

  itemToString(i) {
    return i ? i.name : '';
  }

  render() {
    const {
      clearAriaLabel,
      clearText,
      items,
      labelHint,
      labelText,
      onChange,
      onStateChange
    } = this.props;

    return (
      <Downshift
        itemToString={this.itemToString}
        onChange={onChange}
        onStateChange={onStateChange}
        render={({
          clearSelection,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue
        }) => (
          <div className="ds-u-display--flex ds-u-flex-wrap--wrap ds-c-autocomplete">
            <FormLabel
              className="ds-u-margin-top--0"
              labelClassName="ds-c-autocomplete__label"
              component="label"
              fieldId={this.id}
              hint={labelHint}
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
                        i.name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        className={
                          highlightedIndex === index
                            ? 'ds-u-padding--1 ds-c-autocomplete__list-item ds-c-autocomplete__list-item--active'
                            : 'ds-u-padding--1 ds-c-autocomplete__list-item'
                        }
                        key={item}
                        {...getItemProps({ item })}
                      >
                        {this.itemToString(item)}
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}

            <Button
              aria-label={clearAriaLabel}
              className="ds-u-margin-left--auto ds-u-padding-right--0"
              href="javascript:void(0);"
              onClick={clearSelection}
              size="small"
              variation="transparent"
            >
              {clearText}
            </Button>
          </div>
        )}
      />
    );
  }
}

AutocompleteField.defaultProps = {
  clearAriaLabel: 'Clear typeahead and search again',
  clearText: 'Search again',
  labelHint:
    'This is an autocomplete field. Begin typing to search for relevant information. The number of results will be updated as you type.',
  onChange: noop
};

AutocompleteField.propTypes = {
  clearAriaLabel: PropTypes.string,
  clearText: PropTypes.string,
  itemToString: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object),
  labelHint: PropTypes.string,
  labelText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired
};

export default AutocompleteField;
