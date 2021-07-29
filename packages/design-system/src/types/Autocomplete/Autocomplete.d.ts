import * as React from 'react';
import { DownshiftProps } from 'downshift';

export interface AutocompleteItems {
  id?: string;
  name?: string;
}

type PropsNotPassedToDownshift = 
  | 'ariaClearLabel'
  | 'clearInputText'
  | 'items'
  | 'label'
  | 'loading'
  | 'children'
  | 'className'
  | 'clearSearchButton';

export interface AutocompleteProps extends Omit<DownshiftProps<any>, PropsNotPassedToDownshift> {
  /**
   * Screenreader-specific label for the Clear search `<button>`. Intended to provide a longer, more descriptive explanation of the button's behavior.
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
   * Customize the default status messages announced to screenreader users via aria-live when autocomplete results are populated. [Read more on downshift docs.](https://github.com/paypal/downshift#geta11ystatusmessage)
  */
  getA11yStatusMessage?: DownshiftProps<any>["getA11yStatusMessage"];
  /**
   * Access a reference to the child `TextField`'s `input` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`). [Read more on downshift docs.](https://github.com/paypal/downshift#itemtostring)
   */
  itemToString?: DownshiftProps<any>["itemToString"];
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
  onInputValueChange?: DownshiftProps<any>["onInputValueChange"];
}

export default class Autocomplete extends React.Component<AutocompleteProps, any> {
  render(): JSX.Element;
}
