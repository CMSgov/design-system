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

import Downshift, { A11yStatusMessageOptions, DownshiftProps } from 'downshift';
import Button from '../Button/Button';
import React from 'react';
import TextField from '../TextField/TextField';
import WrapperDiv from './WrapperDiv';
import classNames from 'classnames';
import { errorPlacementDefault } from '../flags';
import get from 'lodash/get';
import keepInputDownshiftStateReducer from './keepInputDownshiftStateReducer';
import uniqueId from 'lodash/uniqueId';
import { t } from '../i18n';

export interface AutocompleteItems {
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

type PropsNotPassedToDownshift =
  | 'ariaClearLabel'
  | 'clearInputText'
  | 'items'
  | 'label'
  | 'loading'
  | 'children'
  | 'className'
  | 'clearInputOnBlur'
  | 'clearSearchButton';

export interface AutocompleteProps extends Omit<DownshiftProps<any>, PropsNotPassedToDownshift> {
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
   * When set to `false`, do not clear the input when the input element loses focus.
   */
  clearInputOnBlur?: boolean;
  /**
   * Text rendered on the page if `clearInput` prop is passed. Default is "Clear search".
   */
  clearInputText?: React.ReactNode;
  /**
   * Removes the Clear search button when set to `false`
   */
  clearSearchButton?: boolean;
  /**
   * Used to focus child `TextField` on `componentDidMount()`
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
  getA11yStatusMessage?: DownshiftProps<any>['getA11yStatusMessage'];
  /**
   * Access a reference to the child `TextField`'s `input` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`). [Read more on downshift docs.](https://github.com/paypal/downshift#itemtostring)
   */
  itemToString?: DownshiftProps<any>['itemToString'];
  /**
   * Array of objects used to populate the suggestion list that appears below the input as users type. This array of objects is intended for an async data callback, and should conform to the prescribed shape to avoid errors.
   */
  items?: AutocompleteItems[];
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
  onChange?: (...args: any[]) => any;
  /**
   * Called when the child `TextField` value changes. Returns a String `inputValue`. [Read more on downshift docs.](https://github.com/paypal/downshift#oninputvaluechange)
   */
  onInputValueChange?: DownshiftProps<any>['onInputValueChange'];
}

/**
 * Determine if a React component is a TextField
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TextField component?
 */
function isTextField(child: React.ReactElement): boolean {
  const componentName = get(child, 'type.displayName') || get(child, 'type.name');

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  return child && (child.type === TextField || componentName === 'TextField');
}

export class Autocomplete extends React.Component<AutocompleteProps, any> {
  static defaultProps = {
    autoCompleteLabel: 'off',
    clearSearchButton: true,
    clearInputOnBlur: true,
    itemToString: (item): string => (item ? item.name : ''),
  };

  constructor(props: AutocompleteProps) {
    super(props);

    this.id = this.props.id || uniqueId('autocomplete_');
    this.labelId = this.props.labelId || uniqueId('autocomplete_label_');
    this.listboxId = uniqueId('autocomplete_owned_listbox_');
    this.listboxContainerId = uniqueId('autocomplete_owned_container_');
    this.listboxHeadingId = uniqueId('autocomplete_header_');
  }

  // Autocomplete class properties
  id: string;
  labelId: string;
  listboxId: string;
  listboxContainerId: string;
  listboxHeadingId: string;

  filterItems(
    items: AutocompleteItems[],
    inputValue: string,
    getInputProps: (...args: any[]) => any,
    getItemProps: (...args: any[]) => any,
    highlightedIndex: number
  ): React.ReactNode {
    // If we have results, create a mapped list
    if (items.length) {
      const { itemToString } = this.props;

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
          {item.children ?? itemToString(item)}
        </li>
      ));
    }

    // If we're waiting for results to load, show the non-selected message
    if (this.props.loading) {
      return (
        <li aria-selected="false" className="ds-c-autocomplete__list-item--message" role="option">
          {this.props.loadingMessage ?? t('autocomplete.loadingMessage')}
        </li>
      );
    }

    // If we have no results, show the non-selected message
    return (
      <li aria-selected="false" className="ds-c-autocomplete__list-item--message" role="option">
        {this.props.noResultsMessage ?? t('autocomplete.noResultsMessage')}
      </li>
    );
  }

  renderChildren(getInputProps: (...args: any[]) => any, listboxOpen: boolean): React.ReactNode[] {
    const isOpen = listboxOpen;
    const { clearSearchButton } = this.props;
    // Extend props on the TextField, by passing them
    // through Downshift's `getInputProps` method
    return React.Children.map(this.props.children, (child: React.ReactElement) => {
      if (isTextField(child)) {
        // The display of bottom placed errorMessages in TextField breaks the Autocomplete's UI design.
        // Add errorMessageClassName to fix the styles for bottom placed errors
        const bottomError =
          (child.props.errorPlacement === 'bottom' || errorPlacementDefault() === 'bottom') &&
          child.props.errorMessage;
        const errorMessageClassName = bottomError
          ? classNames(
              'ds-c-autocomplete__error-message',
              {
                'ds-c-autocomplete__error-message--clear-btn': clearSearchButton,
              },
              child.props.errorMessageClassName
            )
          : child.props.errorMessageClassName;
        const propOverrides = {
          'aria-autocomplete': 'list',
          'aria-controls': this.listboxId,
          'aria-expanded': isOpen,
          'aria-labelledby': null,
          'aria-owns': isOpen ? this.listboxId : null,
          autoComplete: this.props.autoCompleteLabel,
          errorMessageClassName: errorMessageClassName,
          focusTrigger: this.props.focusTrigger,
          id: this.id,
          inputRef: this.props.inputRef,
          labelId: this.labelId,
          onBlur: child.props.onBlur,
          onChange: child.props.onChange,
          onKeyDown: child.props.onKeyDown,
          role: 'combobox',
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
      className,
      clearInputOnBlur,
      clearSearchButton,
      ...autocompleteProps
    }: AutocompleteProps = this.props;

    const rootClassName = classNames('ds-u-clearfix', 'ds-c-autocomplete', className);

    if (clearInputOnBlur === false) {
      autocompleteProps.stateReducer = keepInputDownshiftStateReducer;
    }

    if (items) {
      // We allow items that aren't technically results to be rendered as items in the list, such as
      // a button for viewing all results, but these non-result items should not be counted in the
      // accessibility messages as results. It is not enough to set downshift's `itemCount` property
      // because it will actually make any remaining items past the `itemCount` unselectable with
      // the keyboard.
      const resultCount = items.filter((item) => item.isResult !== false).length;
      if (items.length !== resultCount) {
        const getA11yStatusMessage =
          autocompleteProps.getA11yStatusMessage ?? Downshift.defaultProps.getA11yStatusMessage;
        autocompleteProps.getA11yStatusMessage = (
          args: A11yStatusMessageOptions<AutocompleteItems>
        ) => {
          const newArgs = { ...args, resultCount };
          if (args.previousResultCount === args.resultCount) {
            // Since we are modifying the resultCount, we want to avoid a case where the resultCount
            // doesn't match the previousResultCount when it naturally would. If there's an artificial
            // mismatch between these two values, the result count will be announced each time the
            // currently focused list item changes.
            newArgs.previousResultCount = newArgs.resultCount;
          }
          return getA11yStatusMessage(newArgs);
        };
      }
    }

    return (
      <Downshift {...autocompleteProps}>
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getRootProps,
          highlightedIndex,
          inputValue,
          isOpen,
        }) => (
          <WrapperDiv
            {...getRootProps({
              refKey: 'innerRef',
            })}
            aria-expanded={null}
            aria-haspopup={null}
            aria-labelledby={null}
            aria-owns={null}
            className={rootClassName}
            // role has to be null to overwrite Downshift
            role={null}
          >
            {this.renderChildren(getInputProps, isOpen)}

            {isOpen && (loading || items) ? (
              <div className="ds-c-autocomplete__list" id={this.listboxContainerId}>
                {label && !loading && (
                  <h5 className="ds-c-autocomplete__label" id={this.listboxHeadingId}>
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
                aria-label={ariaClearLabel ?? t('autocomplete.ariaClearLabel')}
                className="ds-u-padding-right--0 ds-c-autocomplete__clear-btn"
                onClick={clearSelection}
                size="small"
                variation="ghost"
              >
                {clearInputText ?? t('autocomplete.clearInputText')}
              </Button>
            )}
          </WrapperDiv>
        )}
      </Downshift>
    );
  }
}

export default Autocomplete;
