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

import { UseComboboxProps, UseComboboxStateChangeOptions, useCombobox } from 'downshift';
import Button from '../Button/Button';
import React, { useRef } from 'react';
import TextField from '../TextField/TextField';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { errorPlacementDefault } from '../flags';
import { t } from '../i18n';
import createFilteredA11yStatusMessageFn from './createFilteredA11yStatusMessageFn';

export interface AutocompleteItem {
  /**
   * Unique identifier for this item
   */
  id?: string;
  /**
   * Displayed value of the item. May alternatively provide a `children` value
   */
  name?: string;
  /**
   * Custom React node as an alternative to a string-only `name`
   */
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the root element.
   * Useful for adding utility classes.
   */
  className?: string;
  /**
   * Whether this item should be counted as one of the results for the purpose of announcing the
   * result count to screen readers
   */
  isResult?: boolean;
}

export interface AutocompleteProps
  extends Omit<UseComboboxProps<any>, 'items' | 'onInputValueChange'> {
  /**
   * Screen reader-specific label for the Clear search `<button>`. Intended to provide a longer, more descriptive explanation of the button's behavior.
   */
  ariaClearLabel?: string;
  /**
   * Control the `TextField` autocomplete attribute. Defaults to "off" to support accessibility. [Read more.](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)
   */
  autoCompleteLabel?: string;
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root element.
   * Useful for adding utility classes.
   */
  className?: string;
  /**
   * Text rendered on the page if `clearInput` prop is passed. Default is "Clear search".
   */
  clearInputText?: React.ReactNode;
  /**
   * Removes the Clear search button when set to `false`
   */
  clearSearchButton?: boolean;
  /*
   * Sets the focus on the select during the first mount
   */
  autoFocus?: boolean;
  /**
   * @deprecated This is deprecated in favor of autoFocus
   * @hide-prop [Deprecated]
   */
  focusTrigger?: boolean;
  /**
   * A unique id to be passed to the child `TextField`. If no id is passed as a prop,
   * the `Autocomplete` component will auto-generate one. This prop was provided in cases
   * where an id might need to be passed to multiple components, such as the `htmlFor`
   * attribute on a label and the id of an input.
   */
  id?: string;
  /**
   * Customize the default status messages announced to screen reader users via aria-live when autocomplete results are populated. [Read more on downshift docs.](https://github.com/paypal/downshift#geta11ystatusmessage)
   */
  getA11yStatusMessage?: UseComboboxProps<any>['getA11yStatusMessage'];
  /**
   * Access a reference to the child `TextField`'s `input` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`). [Read more on downshift docs.](https://github.com/paypal/downshift#itemtostring)
   */
  itemToString?: UseComboboxProps<any>['itemToString'];
  /**
   * Array of objects used to populate the suggestion list that appears below the input as users type. This array of objects is intended for an async data callback, and should conform to the prescribed shape to avoid errors.
   */
  items?: AutocompleteItem[];
  /**
   * Adds a heading to the top of the autocomplete list. This can be used to convey to the user that they're required to select an option from the autocomplete list.
   */
  label?: React.ReactNode;
  /**
   * A unique `id` to be used on the child `TextField` label tag
   */
  labelId?: string;
  /**
   * Can be called when the `items` array is being fetched remotely, or will be delayed for more than 1-2 seconds.
   */
  loading?: boolean;
  /**
   * Message users will see when the `loading` prop is passed to `Autocomplete`.
   */
  loadingMessage?: React.ReactNode;
  /**
   * Message users will see when the `items` array returns empty and the `loading` prop is passed to `<Autocomplete />`.
   */
  noResultsMessage?: React.ReactNode;
  /**
   * Called when the user selects an item and the selected item has changed. Called with the item that was selected and the new state. [Read more on downshift docs.](https://github.com/paypal/downshift#onchange)
   */
  onChange?: (
    selectedItem: AutocompleteItem,
    stateAndHelpers: UseComboboxStateChangeOptions<any>
  ) => void;
  /**
   * Called when the child `TextField` value changes. Returns a String `inputValue`. [Read more on downshift docs.](https://github.com/downshift-js/downshift#oninputvaluechange)
   */
  onInputValueChange?: (
    inputValue: string,
    stateAndHelpers: UseComboboxStateChangeOptions<any>
  ) => void;
}

/**
 * Determine if a React component is a TextField
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TextField component?
 */
function isTextField(child: React.ReactElement): boolean {
  const componentName = (child.type as any)?.displayName || (child.type as any)?.name;

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  return child && (child.type === TextField || componentName === 'TextField');
}

export const Autocomplete = (props: AutocompleteProps) => {
  const id = useRef(props.id ?? uniqueId('autocomplete__input--')).current;
  const labelId = useRef(props.labelId ?? uniqueId('autocomplete__label--')).current;
  const menuId = useRef(uniqueId('autocomplete__menu--')).current;
  const menuContainerId = useRef(uniqueId('autocomplete__menu-container--')).current;
  const menuHeadingId = useRef(uniqueId('autocomplete__header--')).current;

  const {
    ariaClearLabel,
    autoCompleteLabel,
    autoFocus,
    children,
    className,
    clearInputText,
    clearSearchButton,
    focusTrigger,
    id: _id,
    inputRef,
    items,
    itemToString,
    label,
    labelId: _labelId,
    loading,
    loadingMessage,
    noResultsMessage,
    onChange,
    onInputValueChange,
    getA11yStatusMessage,
    ...autocompleteProps
  } = props;

  const { isOpen, getMenuProps, getInputProps, getItemProps, highlightedIndex, selectItem } =
    useCombobox({
      items: items ?? [],
      itemToString,
      inputId: id,
      labelId,
      menuId,
      onSelectedItemChange:
        onChange &&
        ((changes: UseComboboxStateChangeOptions<any>) => {
          // Map to old API where the first parameter is input value
          onChange(changes.selectedItem, changes);
        }),
      onInputValueChange:
        onInputValueChange &&
        ((changes: UseComboboxStateChangeOptions<any>) => {
          // Map to old API where the first parameter is input value
          onInputValueChange(changes.inputValue, changes);
        }),
      getA11yStatusMessage: createFilteredA11yStatusMessageFn(getA11yStatusMessage, items),
      ...autocompleteProps,
    });

  function renderItems() {
    // If we have results, create a mapped list
    if (items?.length) {
      return items.map((item, index) => (
        <li
          aria-selected={highlightedIndex === index}
          className={classNames(item.className, 'ds-c-autocomplete__list-item', {
            'ds-c-autocomplete__list-item--active': highlightedIndex === index,
          })}
          key={item.id}
          role="option"
          {...getItemProps({ item })}
        >
          {item.children ?? props.itemToString(item)}
        </li>
      ));
    }

    // If we're waiting for results to load, show the non-selected message
    if (loading) {
      return (
        <li aria-selected="false" className="ds-c-autocomplete__list-item--message" role="option">
          {loadingMessage ?? t('autocomplete.loadingMessage')}
        </li>
      );
    }

    // If we have no results (empty array), show the non-selected message
    if (items) {
      return (
        <li aria-selected="false" className="ds-c-autocomplete__list-item--message" role="option">
          {noResultsMessage ?? t('autocomplete.noResultsMessage')}
        </li>
      );
    }

    return null;
  }

  function renderChildren(): React.ReactNode[] {
    // Extend props on the TextField, by passing them
    // through Downshift's `getInputProps` method
    return React.Children.map(children, (child: React.ReactElement) => {
      if (!isTextField(child)) {
        return child;
      }

      // The display of bottom placed errorMessages in TextField breaks the Autocomplete's UI design.
      // Add errorMessageClassName to fix the styles for bottom placed errors
      const bottomError =
        (child.props.errorPlacement === 'bottom' || errorPlacementDefault() === 'bottom') &&
        child.props.errorMessage != null;

      const errorMessageClassName = classNames(
        child.props.errorMessageClassName,
        bottomError && 'ds-c-autocomplete__error-message',
        bottomError && clearSearchButton && 'ds-c-autocomplete__error-message--clear-btn'
      );

      const propOverrides = getInputProps({
        autoComplete: autoCompleteLabel,
        autoFocus: autoFocus || focusTrigger,
        id,
        ref: inputRef,
        onBlur: child.props.onBlur,
        onChange: child.props.onChange,
        onKeyDown: child.props.onKeyDown,
      });

      // Downshift wants to put a ref on the input, but we call it `inputRef` in
      // the TextField component.
      propOverrides.inputRef = propOverrides.ref;
      delete propOverrides.ref;

      // TypeScript doesn't want us to pass these to getInputProps because they're unknown
      // to Downshift. They're part of our TextField prop definitions.
      propOverrides.errorMessageClassName = errorMessageClassName;
      propOverrides.labelId = labelId;

      return React.cloneElement(child, propOverrides);
    });
  }

  const rootClassName = classNames('ds-u-clearfix', 'ds-c-autocomplete', className);

  let menuHeading;
  const menuProps = getMenuProps();
  if (label && !loading) {
    menuHeading = (
      <h5 className="ds-c-autocomplete__label" id={menuHeadingId}>
        {label}
      </h5>
    );
    menuProps['aria-labelledby'] = `${menuHeadingId} ${menuProps['aria-labelledby'] ?? ''}`;
  }

  return (
    <div className={rootClassName}>
      {renderChildren()}

      <div
        className={classNames('ds-c-autocomplete__list', !isOpen && 'ds-u-display--none')}
        id={menuContainerId}
      >
        {menuHeading}
        <ul className="ds-c-list--bare" {...menuProps}>
          {renderItems()}
        </ul>
      </div>

      {clearSearchButton && (
        <Button
          aria-label={ariaClearLabel ?? t('autocomplete.ariaClearLabel')}
          className="ds-u-padding-right--0 ds-c-autocomplete__clear-btn"
          onClick={() => {
            // How they clear selection in the docs
            selectItem(null);
          }}
          size="small"
          variation="ghost"
        >
          {clearInputText ?? t('autocomplete.clearInputText')}
        </Button>
      )}
    </div>
  );
};

Autocomplete.defaultProps = {
  autoCompleteLabel: 'off',
  clearSearchButton: true,
  itemToString: (item): string => (item ? item.name : ''),
};

export default Autocomplete;
