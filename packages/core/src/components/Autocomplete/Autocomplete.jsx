import Button from '../Button/Button';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../TextField/TextField';
import uniqueId from 'lodash.uniqueid';

/**
 * Determine if a React component is a TextField
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TextField component?
 */
function isTextField(child) {
  return child != null && child.type === TextField;
}

/**
 * The `Autocomplete` component is a parent component that adds autocomplete functionality to a `TextField component.
 */
export class Autocomplete extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = uniqueId('autocomplete_');
    this.labelId = uniqueId('constrained-list-header_');
  }

  renderChildren(getInputProps) {
    // Extend props on the TextField, by passing them through
    // Downshift's `getInputProps` method
    return React.Children.map(this.props.children, child => {
      if (isTextField(child)) {
        return React.cloneElement(
          child,
          getInputProps({
            fieldClassName: 'ds-c-autocomplete__input',
            id: this.id,
            labelClassName: 'ds-u-margin-top--0 ds-c-autocomplete__label'
          })
        );
      }

      return child;
    });
  }

  render() {
    const {
      clearAriaLabel,
      clearInputText,
      items,
      itemToString,
      label,
      onChange
    } = this.props;

    return (
      <Downshift
        itemToString={itemToString}
        onChange={onChange}
        render={({
          clearSelection,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue
        }) => (
          <div className="ds-u-clearfix ds-c-autocomplete">
            {this.renderChildren(getInputProps)}

            {isOpen ? (
              <div className="ds-u-border--1 ds-u-padding--1 ds-c-autocomplete__list">
                {label && (
                  <h5
                    className="ds-u-margin--0 ds-u-padding--1 ds-u-padding-left--2"
                    id={this.labelId}
                  >
                    {label}
                  </h5>
                )}

                <ul
                  aria-labelledby={label ? this.labelId : null}
                  className="ds-c-list--bare"
                  role="listbox"
                >
                  {items
                    .filter(
                      item =>
                        !inputValue ||
                        item.name
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        aria-selected={highlightedIndex === index}
                        className={
                          highlightedIndex === index
                            ? 'ds-c-autocomplete__list-item ds-c-autocomplete__list-item--active'
                            : 'ds-c-autocomplete__list-item'
                        }
                        key={item.id}
                        role="option"
                        {...getItemProps({ item })}
                      >
                        {itemToString(item)}
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}

            <Button
              aria-label={clearAriaLabel}
              className="ds-u-float--right ds-u-padding-right--0"
              href="javascript:void(0);"
              onClick={clearSelection}
              size="small"
              variation="transparent"
            >
              {clearInputText}
            </Button>
          </div>
        )}
      />
    );
  }
}

Autocomplete.defaultProps = {
  clearAriaLabel: 'Clear typeahead and search again',
  clearInputText: 'Clear search'
};

Autocomplete.propTypes = {
  children: PropTypes.node,
  /**
   * Screenreader-specific label for the Clear input link. Intended to provide a longer, more descriptive explanation of the link's behavior.
   */
  clearAriaLabel: PropTypes.string,
  /**
   * Clear link text that will appear on the page as part of the rendered component
   */
  clearInputText: PropTypes.node,
  /**
   * https://github.com/paypal/downshift#itemtostring
   *
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`.
   */
  itemToString: PropTypes.func,
  /**
   * Array of objects used to populate the suggestion list that appears below the input as users type. This array of objects is intended for an async data callback, and should conform to the prescribed shape to avoid errors.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.name
    })
  ).isRequired,
  /**
   * Adds a heading to the top of the autocomplete list. This is used to convey to the user that they're required to select an option from the autocomplete list.
   */
  label: PropTypes.node,
  /**
   * Called when the user selects an item and the selected item has changed. Called with the item that was selected and the new state of `downshift`.
   *
   * Also see: https://github.com/paypal/downshift#onchange
   */
  onChange: PropTypes.func
};

export default Autocomplete;
