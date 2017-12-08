import Button from '../Button/Button';
import Downshift from 'downshift';
import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import noop from 'nooop';
import uniqueId from 'lodash.uniqueid';

/**
 * An `AutocompleteField` component renders a typeahead input field, form label, and a clear input link.
 */
export class AutocompleteField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = uniqueId('autocomplete_');
  }

  render() {
    const {
      clearAriaLabel,
      clearInputText,
      disabled,
      fieldRef,
      items,
      itemToString,
      labelHint,
      labelText,
      onChange,
      onStateChange,
      ...fieldProps
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
                className: 'ds-c-field ds-c-autocomplete__input',
                disabled: disabled,
                id: this.id,
                ref: fieldRef,
                ...fieldProps
              })}
            />

            {isOpen ? (
              <div className="ds-u-border--1 ds-u-padding--1 ds-c-autocomplete__list">
                <ul className="ds-c-list--bare">
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
                        className={
                          highlightedIndex === index
                            ? 'ds-u-padding--1 ds-c-autocomplete__list-item ds-c-autocomplete__list-item--active'
                            : 'ds-u-padding--1 ds-c-autocomplete__list-item'
                        }
                        key={item.id}
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
              className="ds-u-margin-left--auto ds-u-padding-right--0 ds-c-autocomplete__button"
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
  itemToString: noop,
  labelHint:
    'This is an autocomplete field. Begin typing to search for relevant information. The number of results will be updated as you type.',
  labelText: 'Generic autocomplete label',
  onChange: noop,
  onStateChange: noop
};

AutocompleteField.propTypes = {
  /**
   * Screenreader-specific label for the Clear input link. Intended to provide a longer, more descriptive explanation of the link's behavior.
   */
  clearAriaLabel: PropTypes.string,
  /**
   * Clear link text that will appear on the page as part of the rendered component
   */
  clearInputText: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * https://github.com/paypal/downshift#itemtostring
   *
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`.
   */
  itemToString: PropTypes.func.isRequired,
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
   * Access a reference to the `input` element
   */
  fieldRef: PropTypes.func,
  /**
   * Screenreader-specific instructions for using the autocomplete. The hint is visually hidden, but will be read out to assistive devices when the input receives keyboard focus.
   */
  labelHint: PropTypes.string,
  /**
   * Text string label for the `<FormLabel>` component
   */
  labelText: PropTypes.string.isRequired,
  /**
   * https://github.com/paypal/downshift#onchange
   *
   * Called when the user selects an item and the selected item has changed. Called with the item that was selected and the new state of `downshift`.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * https://github.com/paypal/downshift#onstatechange
   *
   * This function is called anytime the internal state changes. This can be useful if you're using downshift as a "controlled" component, where you manage some or all of the state (e.g. `isOpen, selectedItem, highlightedIndex`, etc) and then pass it as props, rather than letting downshift control all its state itself.
   */
  onStateChange: PropTypes.func.isRequired
};

export default AutocompleteField;
