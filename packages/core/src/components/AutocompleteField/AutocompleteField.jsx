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
          getButtonProps,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          selectedItem
        }) => (
          <div>
            <label htmlFor={this.id}>Favorite fruit</label>
            <input
              {...getInputProps({
                id: this.id,
                placeholder: 'Favorite fruit ?'
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
              <Button aria-label="General label!" onClick={clearSelection}>
                Clear It
              </Button>
            ) : (
              <Button {...getButtonProps()}>Open It!</Button>
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
