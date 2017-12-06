import Button from '../Button/Button';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
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
    const { items, onChange } = this.props;

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
          <div>
            <label className="ds-c-label ds-u-margin-top--0" htmlFor={this.id}>
              Favorite fruit
            </label>

            <input
              {...getInputProps({
                className: 'ds-c-field',
                id: this.id
              })}
            />

            {isOpen ? (
              <div style={{ border: '1px solid #ccc' }}>
                {items
                  .filter(
                    i =>
                      !inputValue ||
                      i.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <div
                      {...getItemProps({ item })}
                      key={item}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? 'gray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal'
                      }}
                    >
                      {item}
                    </div>
                  ))}
              </div>
            ) : null}

            {selectedItem ? (
              <Button
                aria-label="Clear input and search again"
                href="javascript:void(0);"
                onClick={clearSelection}
                size="small"
                variation="transparent"
              >
                Clear Input
              </Button>
            ) : (
              <Button
                aria-label="Input is empty and cannot be cleared"
                disabled
                href="javascript:void(0);"
                onClick={clearSelection}
                size="small"
                variation="transparent"
              >
                Clear Input
              </Button>
            )}
          </div>
        )}
      />
    );
  }
}

AutocompleteField.defaultProps = {};

AutocompleteField.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  labelID: PropTypes.string,
  onChange: PropTypes.func
};

export default AutocompleteField;
