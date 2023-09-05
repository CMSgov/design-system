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

import { UseComboboxProps, UseComboboxStateChangeOptions } from 'downshift';
import Button from '../Button/Button';
import React, { useRef } from 'react';

import classNames from 'classnames';
import { errorPlacementDefault } from '../flags';
import { t } from '../i18n';
import useId from '../utilities/useId';
import { renderReactStatelyItems, renderStatusMessage, getTextFieldChild } from './utils';
import { ComboBoxState, useComboBoxState } from 'react-stately';
import mergeRefs from '../utilities/mergeRefs';
import { useComboBox } from 'react-aria';
import DropdownMenu from '../Dropdown/DropdownMenu';

export interface AutocompleteItem extends Omit<React.HTMLAttributes<'option'>, 'name'> {
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
   * Whether this item should be counted as one of the results for the purpose of announcing the
   * result count to screen readers
   * @deprecated This is no longer used, as we no longer have custom messaging for screen readers
   * @hide-prop [Deprecated]
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
   * Customize the default status messages announced to screen reader users via aria-live when autocomplete results are populated. [Read more on downshift docs.](https://github.com/downshift-js/downshift/tree/master/src/hooks/useCombobox#geta11ystatusmessage)
   * @deprecated This is deprecated in favor of autoFocus
   * @hide-prop [Deprecated]
   */
  getA11yStatusMessage?: any;
  /**
   * Access a reference to the child `TextField`'s `input` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`). [Read more on downshift docs.](https://github.com/paypal/downshift#itemtostring)
   */
  itemToString?: UseComboboxProps<any>['itemToString'];
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
   * Called when the user selects an item and the selected item has changed. Called with the item that was selected and the new state. [Read more on downshift docs.](https://github.com/paypal/downshift#onchange)
   */
  onChange?: (
    selectedItem: AutocompleteItem,
    stateAndHelpers: UseComboboxStateChangeOptions<any>
  ) => void;
  /**
   * Called when the child `TextField` value changes. Returns a String `inputValue`. [Read more on downshift docs.](https://github.com/downshift-js/downshift#oninputvaluechange)
   */
  onInputValueChange?: (inputValue: string, state: ComboBoxState<any>) => void;
}

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/autocomplete/).
 */
export const Autocomplete = (props: AutocompleteProps) => {
  const id = useId('autocomplete--', props.id);
  const labelId = props.labelId ?? `${id}__label`;
  const menuId = `${id}__menu`;
  const menuContainerId = `${id}__menu-container`;
  const menuHeadingId = `${id}__heading`;

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
    inputRef: userInputRef,
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

  // const { isOpen, getMenuProps, getInputProps, getItemProps, highlightedIndex, selectItem } =
  //   useCombobox({
  //     items: items ?? [],
  //     itemToString,
  //     inputId: id,
  //     labelId,
  //     menuId,
  //     onSelectedItemChange:
  //       onChange &&
  //       ((changes: UseComboboxStateChangeOptions<any>) => {
  //         // Map to old API where the first parameter is input value
  //         onChange(changes.selectedItem, changes);
  //       }),
  //     onInputValueChange:
  //       onInputValueChange &&
  //       ((changes: UseComboboxStateChangeOptions<any>) => {
  //         // Map to old API where the first parameter is input value
  //         onInputValueChange(changes.inputValue, changes);
  //       }),
  //     // getA11yStatusMessage: createFilteredA11yStatusMessageFn(getA11yStatusMessage, items),
  //     ...autocompleteProps,
  //   });

  // onInputValueChange &&
  //   (() => {
  //     // Map to old API where the first parameter is input value
  //     onInputValueChange(changes.inputValue, changes);
  //   }),

  // Determine what we'll show based on state
  let reactStatelyItems = [];
  let statusMessage;
  if (items?.length) {
    reactStatelyItems = renderReactStatelyItems(items);
  } else if (loading) {
    // If we're waiting for results to load, show the non-selected message
    statusMessage = renderStatusMessage(loadingMessage ?? t('autocomplete.loadingMessage'));
  } else if (items) {
    // If we have no results (empty array), show the non-selected message
    statusMessage = renderStatusMessage(noResultsMessage ?? t('autocomplete.noResultsMessage'));
  }

  const textField = getTextFieldChild(children);
  const size = textField.props.size;

  const state = useComboBoxState({
    ...props,
    children: reactStatelyItems,
    inputValue: textField.props.value,
    onInputChange: (value) => {
      // textField.props.onChange?.(event)
      onInputValueChange(value, state);
    },
    onSelectionChange: (...args) => {
      console.log(args);
    },
  });

  const inputRef = useRef<HTMLInputElement>();
  const listBoxRef = useRef<HTMLElement>();
  const wrapperRef = useRef<HTMLDivElement>();
  const useComboboxProps = useComboBox(
    {
      ...props,
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

  // console.log(state)
  // console.log(textField.props.value)
  // console.log(useComboboxProps.inputProps)
  const textFieldProps = {
    ...useComboboxProps.inputProps,
    autoComplete: autoCompleteLabel,
    autoFocus: autoFocus || focusTrigger,
    errorMessageClassName,
    id,
    labelId,
    inputRef: mergeRefs([inputRef, userInputRef]),
    // If I uncomment this function, it clears the value faster than I can set it.
    // I'm trying to figure out where to put the "inputValue" prop from https://react-spectrum.adobe.com/react-aria/useComboBox.html#fully-controlled
    // Neither putting it in useComboBox or useComboBoxState seems to work
    // onChange: (event) => {
    //   textField.props.onChange?.(event)
    //   onInputValueChange(event.currentTarget.value, state)
    // }
  };

  const rootClassName = classNames('ds-c-autocomplete', className);

  let menuHeading;
  // const menuProps = getMenuProps();
  if (label && !loading) {
    menuHeading = (
      <h5 className="ds-c-autocomplete__label" id={menuHeadingId}>
        {label}
      </h5>
    );
    // menuProps['aria-labelledby'] = `${menuHeadingId} ${menuProps['aria-labelledby'] ?? ''}`;
  }

  return (
    <div className={rootClassName} ref={wrapperRef}>
      {React.cloneElement(textField, textFieldProps)}

      {state.isOpen && (
        <DropdownMenu
          {...useComboboxProps.listBoxProps}
          componentClass="ds-c-autocomplete"
          labelId={labelId}
          menuId={menuId}
          rootId={id}
          size={size}
          state={state}
          triggerRef={wrapperRef}
          listBoxRef={listBoxRef}
        >
          Hmm, we actually want the menuHeading outside the list...
          {statusMessage}
        </DropdownMenu>
      )}
      {/* <div
        className="ds-c-autocomplete__menu-container"
        id={menuContainerId}
        hidden={!(isOpen && menuContent)}
      >
        {menuHeading}
        <ul className="ds-c-autocomplete__menu" {...menuProps}>
          {statusMessage}
        </ul>
      </div> */}

      {clearSearchButton && (
        <Button
          aria-label={ariaClearLabel ?? t('autocomplete.ariaClearLabel')}
          className="ds-u-padding-right--0 ds-c-autocomplete__clear-btn"
          onClick={() => {
            state.setInputValue('');
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
