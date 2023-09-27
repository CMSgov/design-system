import React, { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import DropdownMenu from '../Dropdown/DropdownMenu';
import classNames from 'classnames';
import mergeRefs from '../utilities/mergeRefs';
import useId from '../utilities/useId';
import { errorPlacementDefault } from '../flags';
import {
  renderReactStatelyItems,
  renderStatusMessage,
  getTextFieldChild,
  getActiveDescendant,
} from './utils';
import { t } from '../i18n';
import { useComboBox } from '../react-aria'; // from react-aria
import { useComboBoxState } from '../react-aria'; // from react-stately
import usePrevious from '../utilities/usePrevious';

export interface AutocompleteItem extends Omit<React.HTMLAttributes<'option'>, 'name'> {
  /**
   * Unique identifier for this item
   */
  id: string;
  /**
   * Displayed value of the item. May alternatively provide a `children` value
   */
  name?: string;
  /**
   * Custom React node as an alternative to a string-only `name`
   */
  children?: React.ReactNode;
  /**
   * Whether this item should be counted as one of the results for the purpose of announcing the
   * result count to screen readers
   * @deprecated This is no longer used, as we no longer have custom messaging for screen readers
   * @hide-prop [Deprecated]
   */
  isResult?: boolean;
}

export interface AutocompleteProps {
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
   * Customize the default status messages announced to screen reader users via aria-live when autocomplete results are populated.
   * @deprecated This is no longer used
   * @hide-prop [Deprecated]
   */
  getA11yStatusMessage?: any;
  /**
   * Access a reference to the child `TextField`'s `input` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`).
   * @deprecated Please provide a `name` property to each item instead.
   * @hide-prop [Deprecated]
   */
  itemToString?: (item: AutocompleteItem) => string;
  /**
   * Array of objects used to populate the suggestion list that appears below the input as users type.
   * Passing an empty array will show a "No results" message. If you do not yet want to show results,
   * this props should be undefined.
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
   * Called when the user selects an item and the selected item has changed. Called with the item that was selected.
   */
  onChange?: (selectedItem: AutocompleteItem) => void;
  /**
   * Called when the child `TextField` value changes. Is called with a string representing the input value.
   */
  onInputValueChange?: (inputValue: string) => void;
}

/**
 * The Autocomplete component wraps a TextField component and turns it into a combobox,
 * where a user can type into the text field and see matching results. They can then
 * select one of these results from the list, which will trigger an `onChange` event on
 * the Autocomplete.
 *
 * The two event handlers that should be used when this is a controlled component are
 * `onChange` and `onInputValueChange`. They are defined on the Autocomplete component
 * and not its child TextField component.
 *
 * As the user types and `onInputValueChange` is called, you should be supplying relevant
 * results to the Autocomplete through the `items` prop. The `items` prop is an array of
 * objects. Passing an empty array will show a "No results" message. If you do not yet
 * want to show results—for instance, because they haven't typed enough characters yet to
 * make a database call—the `items` prop should remain be undefined. If you are still
 * loading the results, use the `loading` boolean prop to display the loading message to
 * the user.
 *
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/autocomplete/).
 */
export const Autocomplete = (props: AutocompleteProps) => {
  const id = useId('autocomplete--', props.id);
  const menuId = `${id}__menu`;

  const {
    ariaClearLabel,
    autoCompleteLabel,
    autoFocus,
    children,
    className,
    clearInputText,
    clearSearchButton,
    focusTrigger,
    inputRef: userInputRef,
    items,
    itemToString,
    label: menuHeading,
    labelId: menuHeadingId,
    loading,
    loadingMessage,
    noResultsMessage,
    onChange,
    onInputValueChange,
    ...autocompleteProps
  } = props;

  // Determine what we'll show based on state
  let reactStatelyItems = [];
  let statusMessage;
  if (items?.length) {
    reactStatelyItems = renderReactStatelyItems(items, itemToString);
  } else if (loading) {
    // If we're waiting for results to load, show the non-selected message
    statusMessage = renderStatusMessage(loadingMessage ?? t('autocomplete.loadingMessage'));
  } else if (items) {
    // If we have no results (empty array), show the non-selected message
    statusMessage = renderStatusMessage(noResultsMessage ?? t('autocomplete.noResultsMessage'));
  }

  const textField = getTextFieldChild(children);
  const size = textField.props.size;
  const labelId = textField.props.labelId ?? `${id}__label`;

  const state = useComboBoxState({
    ...autocompleteProps,
    allowsCustomValue: true,
    allowsEmptyCollection: true,
    children: reactStatelyItems,
    inputValue: textField.props.value,
    onInputChange: onInputValueChange
      ? (value) => {
          onInputValueChange(value);
        }
      : undefined,
    onSelectionChange: onChange
      ? (selectedKey) => {
          const selectedItem = items ? items.find((item) => selectedKey === item.id) : undefined;
          // We don't call onChange when the user deletes text, even though react-aria will call
          // this function with `null` if the input is cleared out. This is to maintain backwards
          // compatability, but we could consider changing this behavior in the future. If we
          // decide to remove this check, we can also remove the explicit `onChange` call in the
          // clear button handler.
          if (selectedItem) {
            onChange(selectedItem);
          }
        }
      : undefined,
  });

  const inputRef = useRef<HTMLInputElement>();
  const listBoxRef = useRef<HTMLElement>();
  const wrapperRef = useRef<HTMLDivElement>();
  const useComboboxProps = useComboBox(
    {
      ...autocompleteProps,
      name: textField.props.name,
      label: textField.props.label,
      inputRef,
      listBoxRef,
      popoverRef: listBoxRef,
    },
    state
  );

  // The display of bottom placed errorMessages in TextField breaks the Autocomplete's UI design.
  // Add errorMessageClassName to fix the styles for bottom placed errors
  const bottomError =
    (textField.props.errorPlacement === 'bottom' || errorPlacementDefault() === 'bottom') &&
    textField.props.errorMessage != null;

  const errorMessageClassName = classNames(
    textField.props.errorMessageClassName,
    bottomError && 'ds-c-autocomplete__error-message',
    bottomError && clearSearchButton && 'ds-c-autocomplete__error-message-clear-btn'
  );

  const textFieldProps = {
    ...useComboboxProps.inputProps,
    autoComplete: autoCompleteLabel,
    autoFocus: autoFocus || focusTrigger,
    'aria-activedescendant': useComboboxProps.inputProps['aria-activedescendant']
      ? getActiveDescendant(id, state, items)
      : undefined,
    'aria-controls': menuId,
    'aria-labelledby': labelId,
    errorMessageClassName,
    id,
    labelId,
    inputRef: mergeRefs([inputRef, userInputRef]),
    // Restores previous functionality where if you had typed characters into the text
    // field to get results and then blur away and come back, it'll open the results
    // list again without having to press anything on the keyboard.
    onFocus: (event) => {
      useComboboxProps.inputProps.onFocus?.(event);
      textField.props.onFocus?.(event);
      state.open();
    },
    // Allow the user to continue to attach their own event handlers to the TextField.
    // The following event handlers would normally be overwritten by useCombobox.
    onChange: (event) => {
      useComboboxProps.inputProps.onChange?.(event);
      textField.props.onChange?.(event);
    },
    onBlur: (event) => {
      useComboboxProps.inputProps.onBlur?.(event);
      textField.props.onBlur?.(event);
    },
    onTouchEnd: (event) => {
      useComboboxProps.inputProps.onTouchEnd?.(event);
      textField.props.onTouchEnd?.(event);
    },
    onKeyDown: (event) => {
      useComboboxProps.inputProps.onKeyDown?.(event);
      textField.props.onKeyDown?.(event);
    },
  };

  // const oldItems = usePrevious(items);
  // useEffect(() => {
  //   // If the items come in significantly later than when the user started typing,
  //   // react-stately will not realize that it should be showing those results. There
  //   // might be items, but `isOpen` will be false 🤦‍♂️.
  //   if (state.isFocused && items && items !== oldItems) {
  //     const itemsJson = JSON.stringify(items);
  //     const oldItemsJson = JSON.stringify(oldItems);
  //     // Only open it if the actual data changed. This whole useEffect is a hack, and
  //     // we need to get really specific here if we don't want there to be problems.
  //     if (itemsJson !== oldItemsJson) {
  //       console.log(itemsJson, oldItemsJson);
  //       state.open();
  //     }
  //   }
  // }, [items]);

  const rootClassName = classNames('ds-c-autocomplete', className);

  return (
    <div className={rootClassName} ref={wrapperRef}>
      {React.cloneElement(textField, textFieldProps)}

      {((state.isOpen && reactStatelyItems.length > 0) || (state.isFocused && statusMessage)) && (
        <DropdownMenu
          {...useComboboxProps.listBoxProps}
          componentClass="ds-c-autocomplete"
          heading={menuHeading}
          labelId={menuHeadingId}
          menuId={menuId}
          rootId={id}
          size={size}
          state={state}
          triggerRef={wrapperRef}
          listBoxRef={listBoxRef}
        >
          {statusMessage}
        </DropdownMenu>
      )}

      {clearSearchButton && (
        <Button
          aria-label={ariaClearLabel ?? t('autocomplete.ariaClearLabel')}
          className="ds-u-padding-right--0 ds-c-autocomplete__clear-btn"
          onClick={() => {
            state.setSelectedKey(null);
            state.setInputValue('');
            if (state.selectedKey) {
              onChange?.(null);
            }
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
};

export default Autocomplete;
