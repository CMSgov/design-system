/**
 * https://www.levelaccess.com/differences-aria-1-0-1-1-changes-rolecombobox/
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 * https://www.digitala11y.com/aria-autocomplete-properties/
 *
 * We have opted to retain the ARIA 1.0 markup pattern for comboboxes.
 * This was done because the ARIA 1.1 markup pattern triggers a different
 * behavior on containers with a role="combobox" attribute. WCAG refers to
 * this as a composite widget: https://www.w3.org/TR/wai-aria-1.1/#h-composite
 *
 * Our testing with screen readers, specifically JAWS, has been the deciding
 * factor in going back to the ARIA 1.0 markup pattern. There were a number
 * of conflicting interactions using the 1.1 markup pattern that felt like
 * an unacceptable regression of the user experience.
 */

import Button from '../Button/Button';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../TextField/TextField';
import WrapperDiv from './WrapperDiv';
import classNames from 'classnames';
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

    this.id = this.props.id || uniqueId('autocomplete_');
    this.labelId = this.props.labelId || uniqueId('autocomplete_label_');
    this.listboxId = uniqueId('autocomplete_owned_listbox_');
    this.listboxContainerId = uniqueId('autocomplete_owned_container_');
    this.listboxHeadingId = uniqueId('autocomplete_header_');
  }

  filterItems(items, inputValue, getInputProps, getItemProps, highlightedIndex) {
    // If we have results, create a mapped list
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

    // If we're waiting for results to load, show the non-selected message
    if (this.props.loading) {
      return (
        <li aria-selected="false" className="ds-c-autocomplete__list-item--message" role="option">
          {this.props.loadingMessage}
        </li>
      );
    }

    // If we have no results, show the non-selected message
    return (
      <li aria-selected="false" className="ds-c-autocomplete__list-item--message" role="option">
        {this.props.noResultsMessage}
      </li>
    );
  }

  renderChildren(getInputProps, listboxOpen) {
    const isOpen = listboxOpen;
    // Extend props on the TextField, by passing them
    // through Downshift's `getInputProps` method
    return React.Children.map(this.props.children, child => {
      if (isTextField(child)) {
        const propOverrides = {
          'aria-autocomplete': 'list',
          'aria-controls': isOpen ? this.listboxId : null,
          'aria-expanded': isOpen,
          'aria-labelledby': null,
          'aria-owns': isOpen ? this.listboxId : null,
          autoComplete: this.props.autoCompleteLabel,
          focusTrigger: this.props.focusTrigger,
          id: this.id,
          inputRef: this.props.inputRef,
          labelId: this.labelId,
          onBlur: child.props.onBlur,
          onChange: child.props.onChange,
          onKeyDown: child.props.onKeyDown,
          role: 'combobox'
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
      className,
      clearSearchButton,
      ...autocompleteProps
    } = this.props;

    const rootClassName = classNames('ds-u-clearfix', 'ds-c-autocomplete', className);

    return (
      <Downshift {...autocompleteProps}>
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getRootProps,
          highlightedIndex,
          inputValue,
          isOpen
        }) => (
          <WrapperDiv
            {...getRootProps({
              'aria-expanded': null,
              'aria-haspopup': null,
              'aria-labelledby': null,
              'aria-owns': null,
              className: rootClassName,
              refKey: 'innerRef',
              role: null
            })}
          >
            {this.renderChildren(getInputProps, isOpen)}

            {isOpen && (loading || items) ? (
              <div
                className="ds-u-border--1 ds-u-padding--1 ds-c-autocomplete__list"
                id={this.listboxContainerId}
              >
                {label && !loading && (
                  <h5 className="ds-u-margin--0 ds-u-padding--1" id={this.listboxHeadingId}>
                    {label}
                  </h5>
                )}

                <ul
                  aria-labelledby={label ? this.listboxHeadingId : null}
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

            {clearSearchButton && (
              <Button
                aria-label={ariaClearLabel}
                className="ds-u-float--right ds-u-margin-right--0"
                onClick={clearSelection}
                size="small"
                variation="transparent"
              >
                {clearInputText}
              </Button>
            )}
          </WrapperDiv>
        )}
      </Downshift>
    );
  }
}

Autocomplete.defaultProps = {
  ariaClearLabel: 'Clear search to try again',
  autoCompleteLabel: 'off',
  clearInputText: 'Clear search',
  clearSearchButton: true,
  itemToString: item => (item ? item.name : ''),
  loadingMessage: 'Loading...',
  noResultsMessage: 'No results'
};

Autocomplete.propTypes = {
  /**
   * Screenreader-specific label for the Clear search `<button>`. Intended to provide a longer, more descriptive explanation of the button's behavior.
   */
  ariaClearLabel: PropTypes.string,
  /**
   * Control the `TextField` autocomplete attribute. Defaults to "off" to support accessibility. [Read more.](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)
   */
  autoCompleteLabel: PropTypes.string,
  /**
   * Must contain a `TextField` component
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root element.
   * Useful for adding utility classes.
   */
  className: PropTypes.string,
  /**
   * Text rendered on the page if `clearInput` prop is passed. Default is "Clear search".
   */
  clearInputText: PropTypes.node,
  /**
   * Removes the Clear search button when set to `false`
   */
  clearSearchButton: PropTypes.bool,
  /**
   * Used to focus child `TextField` on `componentDidMount()`
   */
  focusTrigger: PropTypes.bool,
  /**
   * A unique id to be passed to the child `TextField`. If no id is passed as a prop,
   * the `Autocomplete` component will auto-generate one. This prop was provided in cases
   * where an id might need to be passed to multiple components, such as the `htmlFor`
   * attribute on a label and the id of an input.
   */
  id: PropTypes.string,
  /**
   * Access a reference to the child `TextField`'s `input` element
   */
  inputRef: PropTypes.func,
  /**
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`). [Read more on downshift docs.](https://github.com/paypal/downshift#itemtostring)
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
   * A unique `id` to be used on the child `TextField` label tag
   */
  labelId: PropTypes.string,
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
   * Called when the user selects an item and the selected item has changed. Called with the item that was selected and the new state. [Read more on downshift docs.](https://github.com/paypal/downshift#onchange)
   */
  onChange: PropTypes.func,
  /**
   * Called when the child `TextField` value changes. Returns a String `inputValue`. [Read more on downshift docs.](https://github.com/paypal/downshift#oninputvaluechange)
   */
  onInputValueChange: PropTypes.func
};

export default Autocomplete;
