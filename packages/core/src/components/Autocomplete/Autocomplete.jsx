import 'core-js/fn/array/find';
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
 * The `Autocomplete` component is a parent component that adds autocomplete functionality to a `TextField` component.
 */
export class Autocomplete extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = uniqueId('autocomplete_');
    this.labelId = uniqueId('autocomplete_header_');
    this.listboxId = uniqueId('autocomplete_owned_listbox_');
  }

  filterItems(
    items,
    inputValue,
    getInputProps,
    getItemProps,
    highlightedIndex
  ) {
    if (this.props.loading) {
      return (
        <li className="ds-c-autocomplete__list-item--message">
          {this.props.loadingMessage}
        </li>
      );
    }

    if (items.length) {
      return items.map((item, index) => (
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
          {this.props.itemToString(item)}
        </li>
      ));
    }

    return (
      <li className="ds-c-autocomplete__list-item--message">
        {this.props.noResultsMessage}
      </li>
    );
  }

  renderChildren(getInputProps) {
    // Extend props on the TextField, by passing them through
    // Downshift's `getInputProps` method
    return React.Children.map(this.props.children, child => {
      if (isTextField(child)) {
        const propOverrides = {
          'aria-controls': this.listboxId,
          id: this.id,
          onBlur: child.props.onBlur,
          onChange: child.props.onChange,
          onKeyDown: child.props.onKeyDown
        };

        return React.cloneElement(child, getInputProps(propOverrides));
      }

      return child;
    });
  }

  render() {
    const {
      ariaClearLabel,
      clearInputText,
      items,
      label,
      loading,
      children,
      ...autocompleteProps
    } = this.props;

    return (
      <Downshift
        render={({
          clearSelection,
          getInputProps,
          getItemProps,
          highlightedIndex,
          inputValue,
          isOpen
        }) => (
          <div className="ds-u-clearfix ds-c-autocomplete">
            {this.renderChildren(getInputProps)}

            {isOpen && (loading || items) ? (
              <div className="ds-u-border--1 ds-u-padding--1 ds-c-autocomplete__list">
                {label &&
                  !loading && (
                    <h5
                      className="ds-u-margin--0 ds-u-padding--1"
                      id={this.labelId}
                    >
                      {label}
                    </h5>
                  )}

                <ul
                  aria-labelledby={label ? this.labelId : null}
                  className="ds-c-list--bare"
                  id={this.listboxId}
                  role="listbox"
                >
                  {this.filterItems(
                    items,
                    inputValue,
                    getInputProps,
                    getItemProps,
                    highlightedIndex
                  )}
                </ul>
              </div>
            ) : null}

            <Button
              aria-label={ariaClearLabel}
              className="ds-u-float--right ds-u-padding-right--0"
              onClick={clearSelection}
              size="small"
              variation="transparent"
            >
              {clearInputText}
            </Button>
          </div>
        )}
        {...autocompleteProps}
      />
    );
  }
}

Autocomplete.defaultProps = {
  ariaClearLabel: 'Clear typeahead and search again',
  clearInputText: 'Clear search',
  itemToString: item => (item ? item.name : ''),
  loadingMessage: 'Loading...',
  noResultsMessage: 'No results'
};

Autocomplete.propTypes = {
  /**
   * Screenreader-specific label for the Clear search `<button>`. Intended to provide a longer, more descriptive explanation of the button's behavior.
   */
  ariaClearLabel: PropTypes.string,
  children: PropTypes.node,
  /**
   * Clear search text that will appear on the page as part of the rendered `<button>` component
   */
  clearInputText: PropTypes.node,
  /**
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`).
   *
   * Also see: https://github.com/paypal/downshift#itemtostring
   */
  itemToString: PropTypes.func,
  /**
   * Array of objects used to populate the suggestion list that appears below the input as users type. This array of objects is intended for an async data callback, and should conform to the prescribed shape to avoid errors.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ),
  /**
   * Adds a heading to the top of the autocomplete list. This can be used to convey to the user that they're required to select an option from the autocomplete list.
   */
  label: PropTypes.node,
  /**
   * Can be called when the `items` array is being fetched remotely, or will be delayed for more than 1-2 seconds.
   */
  loading: PropTypes.bool,
  /**
   * Message users will see when the `loading` prop is passed to `Autocomplete`.
   */
  loadingMessage: PropTypes.node,
  /**
   * Message users will see when the `items` array returns empty and the `loading` prop is passed to `<Autocomplete />`.
   */
  noResultsMessage: PropTypes.node,
  /**
   * Called when the user selects an item and the selected item has changed. Called with the item that was selected and the new state.
   *
   * Also see: https://github.com/paypal/downshift#onchange
   */
  onChange: PropTypes.func,
  /**
   * Called when the child `TextField` value changes. Returns a String `inputValue`.
   *
   * Also see: https://github.com/paypal/downshift#oninputvaluechange
   */
  onInputValueChange: PropTypes.func
};

export default Autocomplete;
