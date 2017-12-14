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
 * An `AutocompleteField` component renders a typeahead input field, form label, and a clear input link.
 */
export class AutocompleteField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = uniqueId('autocomplete_');
  }

  renderChildren(getInputProps) {
    // Extend props on the TextField, by passing them through
    // Downshift's `getInputProps` method
    return React.Children.map(this.props.children, child => {
      const { isDisabled } = this.props;

      if (isTextField(child)) {
        return React.cloneElement(
          child,
          getInputProps({
            className: isDisabled ? 'ds-c-autocomplete__inner--disabled' : '',
            disabled: isDisabled,
            fieldClassName: 'ds-c-autocomplete__input',
            id: this.id,
            inputId: this.id,
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
      constrainedList,
      constrainedListText,
      items,
      itemToString,
      onChange,
      onStateChange
    } = this.props;

    return (
      <Downshift
        itemToString={itemToString}
        onChange={onChange}
        onStateChange={onStateChange}
        render={({
          clearSelection,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          itemCount
        }) => (
          <div className="ds-u-clearfix ds-c-autocomplete">
            {this.renderChildren(getInputProps)}

            {isOpen ? (
              <div className="ds-u-border--1 ds-u-padding--1 ds-c-autocomplete__list">
                {constrainedList ? (
                  <h5
                    className="ds-u-margin--0 ds-u-padding--1"
                    id="constrained-list-header"
                  >
                    {constrainedListText}
                  </h5>
                ) : null}

                <p>{itemCount}</p>

                <ul
                  aria-labelledby={
                    constrainedList ? 'constrained-list-header' : null
                  }
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
                            ? 'ds-u-padding--1 ds-c-autocomplete__list-item ds-c-autocomplete__list-item--active'
                            : 'ds-u-padding--1 ds-c-autocomplete__list-item'
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
              className="ds-u-float--right ds-u-padding-right--0 ds-c-autocomplete__button"
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

AutocompleteField.defaultProps = {
  clearAriaLabel: 'Clear typeahead and search again',
  clearInputText: 'Search again',
  constrainedListText: 'Select from the options below:'
};

AutocompleteField.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Screenreader-specific label for the Clear input link. Intended to provide a longer, more descriptive explanation of the link's behavior.
   */
  clearAriaLabel: PropTypes.string,
  /**
   * Clear link text that will appear on the page as part of the rendered component
   */
  clearInputText: PropTypes.string,
  /**
   * Adds a conditional header to `<div.ds-c-autocomplete__list>`
   */
  constrainedList: PropTypes.bool,
  /**
   * Text string for the `<h5>` header added to the`<div.ds-c-autocomplete__list>` when prop `constrainedList`is passed to `<Autocomplete>`
   */
  constrainedListText: PropTypes.string,
  /**
   * Passes prop `disabled` to the child `<Textfield>` component
   */
  isDisabled: PropTypes.bool,
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
   * https://github.com/paypal/downshift#onchange
   *
   * Called when the user selects an item and the selected item has changed. Called with the item that was selected and the new state of `downshift`.
   */
  onChange: PropTypes.func,
  /**
   * https://github.com/paypal/downshift#onstatechange
   *
   * This function is called anytime the internal state changes. This can be useful if you're using downshift as a "controlled" component, where you manage some or all of the state (e.g. `isOpen, selectedItem, highlightedIndex`, etc) and then pass it as props, rather than letting downshift control all its state itself.
   */
  onStateChange: PropTypes.func
};

export default AutocompleteField;
