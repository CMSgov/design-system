import { UseComboboxState, UseComboboxStateChangeOptions, useCombobox } from 'downshift';

/**
 * For some use cases of the Autocomplete component, we do not want the input to
 * be cleared when the input element loses focus. The default behavior of Downshift
 * is to clear the input value when the field loses focus. This custom Downshift
 * state reducer keeps that input value rather than clearing it.
 */
export default function keepInputDownshiftStateReducer(
  state: UseComboboxState<any>,
  changes: UseComboboxStateChangeOptions<any>
) {
  switch (changes.type) {
    case useCombobox.stateChangeTypes.InputBlur:
      return {
        inputValue: state.inputValue,
        isOpen: false,
      };
    // Clear input when `esc` is pressed
    // Default behavior to reselect the last selected item, but that doesn't
    // trigger the validations for the change events
    case useCombobox.stateChangeTypes.InputKeyDownEscape:
      return {
        inputValue: '',
        isOpen: false,
        selectedItem: null,
      };
    default:
      return changes;
  }
}
